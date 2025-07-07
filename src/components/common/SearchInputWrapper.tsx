
import React from 'react';
import { EnhancedInput } from './EnhancedInput';

interface SearchInputWrapperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function SearchInputWrapper({
  value,
  onChange,
  placeholder = "Rechercher...",
  context = "search",
  className,
  onKeyPress,
  disabled = false
}: SearchInputWrapperProps) {
  return (
    <EnhancedInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      context={context}
      className={className}
      onKeyPress={onKeyPress}
      disabled={disabled}
      enableVoice={true}
    />
  );
}
