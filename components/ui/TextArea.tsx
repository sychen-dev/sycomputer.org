import { forwardRef, TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const reactId = useId();
    const textareaId = id ?? reactId;

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'min-h-[120px] w-full rounded-md border border-line bg-paper px-3.5 py-3 text-sm transition-colors',
            'placeholder:text-soft/70',
            'hover:border-soft focus:border-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-none',
            error && 'border-red-500',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export { TextArea };
