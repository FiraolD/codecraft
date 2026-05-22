import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Project, Message } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async (publishedOnly = false) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('projects').select('*');
      if (publishedOnly) {
        query = query.eq('status', 'published');
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError('Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    if (error) throw error;
    await fetchProjects(false);
    return data;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await fetchProjects(false);
    return data;
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    await fetchProjects(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject };
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id);
    if (error) throw error;
    await fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw error;
    await fetchMessages();
  };

  const submitMessage = async (message: Omit<Message, 'id' | 'created_at' | 'read'>) => {
    const { error } = await supabase.from('messages').insert([{ ...message, read: false }]);
    if (error) throw error;
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, fetchMessages, markAsRead, deleteMessage, submitMessage };
}