import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      return await authService.signUp(email, password);
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { register, loading, error };
}