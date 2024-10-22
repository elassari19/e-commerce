'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Properties } from '@prisma/client';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex gap-4 h-10 items-center justify-center rounded-md p-4',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center border whitespace-nowrap rounded-full px-6 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-green-100 data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tabList: string[];
  tabContent: React.ReactNode[];
  reverse?: boolean;
}

export const CustomTabs = ({ tabList, tabContent, className }: Props) => {
  return (
    <Tabs defaultValue={tabList[0]} className={cn('w-full', className)}>
      <TabsList>
        {tabList.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabContent.map((content, idx) => (
        <TabsContent key={idx} value={tabList[idx]}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

interface PrewiewProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tabList: any[];
  tabContent: any[];
  properties: string[];
}

export const PreviewTabs = ({
  tabList,
  tabContent,
  className,
  properties,
}: PrewiewProps) => {
  console.log('properties', properties);
  return (
    <Tabs className={cn('w-full', className)} defaultValue={properties?.[0]}>
      <div>
        {tabContent?.map((content, idx) => (
          <TabsContent key={idx} value={properties?.[idx]} className="mb-4">
            {content}
          </TabsContent>
        ))}
      </div>
      <TabsList className="w-full overflow-auto justify-start p-0 h-16">
        {tabList?.map((tab, idx) => (
          <TabsTrigger
            key={idx}
            value={properties?.[idx]}
            className="w-16 h-full p-1 rounded-lg data-[state=active]:bg-black/10"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
