import React, { useState } from 'react';

interface ProjectFormProps {
  initialName?: string;
  initialColor?: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function ProjectForm({
  initialName = '',
  initialColor = '#007bff',
  onSubmit,
  onCancel,
  submitLabel = 'Enregistrer',
}: ProjectFormProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, color);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        margin: '1rem',
        maxWidth: '400px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Nom du projet:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="color" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Couleur:
        </label>
        <input
          id="color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '100%', height: '40px', cursor: 'pointer' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
