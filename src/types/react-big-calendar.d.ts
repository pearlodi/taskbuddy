// types/react-big-calendar.d.ts
declare module 'react-big-calendar' {
    import { ComponentType, CSSProperties } from 'react';
  
    export interface Event {
      title: string;
      start: Date;
      end: Date;
      allDay?: boolean;
      resource?: any;
    }
  
    export interface View {
      name: string;
      title: string;
    }
  
    export interface ViewsProps {
      month?: boolean | ComponentType<any>;
      week?: boolean | ComponentType<any>;
      work_week?: boolean | ComponentType<any>;
      day?: boolean | ComponentType<any>;
      agenda?: boolean | ComponentType<any>;
    }
  
    export interface CalendarProps {
      events: Event[];
      views?: ViewsProps;
      step?: number;
      date?: Date;
      defaultDate?: Date;
      localizer: any;
      style?: CSSProperties;
      startAccessor?: string | ((event: Event) => Date);
      endAccessor?: string | ((event: Event) => Date);
    }
  
    export const Calendar: ComponentType<CalendarProps>;
    export const dateFnsLocalizer: (config: any) => any;
  }
  