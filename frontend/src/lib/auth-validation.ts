export async function validateToken(token: string, refreshToken?: string): Promise<{ valid: boolean; user?: unknown }> {
  try {
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Cookie': `accessToken=${token}; refreshToken=${refreshToken || ''}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return { valid: false };
    }

    const userData = await response.json();
    return { valid: true, user: userData };
  } catch (error) {
    console.error('Token validation error:', error);
    return { valid: false };
  }
}