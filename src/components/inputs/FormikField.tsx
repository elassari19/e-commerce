import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ErrorMessage, Field, FieldAttributes } from 'formik';
import { UseMemo } from '../layout';
import { UploadCloud } from 'lucide-react';
import Typography from '../layout/typography';

const InputVariants = cva(
  'flex border border-black-300 flex-row gap-4 items-center justify-center p-3 py-1 rounded-md text-black text-md font-medium border outline-none',
  {
    variants: {
      variant: {
        default: 'focus:border-black bg-white',
        secondary: 'border-white focus:border-white-200',
        ghost: 'border-0',
        destructive: 'border-red-800',
        success: 'border-green-200 focus:border-green-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends FieldAttributes<any>,
    VariantProps<typeof InputVariants> {
  preIcon?: any;
  sufIcon?: any;
  name: string;
}

const FormikField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, variant, preIcon, sufIcon, name, ...props }, ref) => {
    if (props.type === 'file') {
      return (
        <UseMemo dependencies={[props.value]}>
          <div
            className={cn(
              InputVariants({ variant, className }),
              'h-40 relative border-2 border-dashed border-primary'
            )}
          >
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <UploadCloud size={34} className="text-primary font-bold" />
              <Typography heading="p">Drag your images here</Typography>
              <Typography heading="p" variant="h6" className="text-gray-400">
                (Only *.jpeg, *.webp and *.png images will be accepted)
              </Typography>
            </div>
            <Field
              id={name}
              name={name}
              value={props.value}
              placeholder={props.placeholder}
              onChange={props.onChange}
              {...props}
              ref={ref}
              className="w-full h-full absolute left-0 top-0 opacity-0 border"
            />
          </div>

          <div className="text-sm relative text-red-800 left-0 bg-background h-4 text-start p-1 px-4 mb-2">
            <ErrorMessage name={name} className="absolute z-10 top-0" />
          </div>
        </UseMemo>
      );
    }

    if (props.type === 'checkbox') {
      return (
        <UseMemo dependencies={[props.value]}>
          <div
            className={cn(
              InputVariants({ variant, className }),
              'flex justify-start items-center gap-4 p-4 bg-foreground'
            )}
          >
            <Field
              id={name}
              name={name}
              {...props}
              ref={ref}
              className="w-4 h-4"
            />
            <label htmlFor={name} className="text-sm">
              {props.placeholder}
            </label>
          </div>
        </UseMemo>
      );
    }

    return (
      <UseMemo dependencies={[props.value]}>
        {/* input section */}
        <label htmlFor={name} className="text-sm">
          {props.placeholder}
        </label>
        <div className={cn(InputVariants({ variant, className }))}>
          {preIcon}
          <Field
            id={name}
            name={name}
            value={props.value}
            placeholder={props.placeholder}
            {...props}
            ref={ref}
            className="flex-1 min-h-8 w-full bg-inherit px-3 py-2 text-sm placeholder:text-slate-500 outline-none"
          />
          {children}
          {sufIcon}
        </div>

        <div className="text-sm relative text-red-800 left-0 bg-background h-4 text-start p-1 px-4 mb-2">
          <ErrorMessage name={name} className="absolute z-10 top-0" />
        </div>
      </UseMemo>
    );
  }
);
FormikField.displayName = 'FormikField';

export default FormikField;
