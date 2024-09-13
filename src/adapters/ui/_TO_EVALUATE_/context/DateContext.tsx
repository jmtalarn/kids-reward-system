import React, { createContext, useContext, useState } from 'react';


interface DateContextProps {
	date: Date;
	setNewDate: (date: Date) => void;
	setToday: () => void;
	forwardDays: (n: number) => void;
	backwardDays: (n: number) => void;
	forwardMonth: () => void;
	backwardMonth: () => void;
}

const DateContext = createContext<DateContextProps | undefined>(undefined);



export const DateProvider = ({ children }: { children: React.ReactNode }) => {
	const [date, setDate] = useState<Date>(new Date());

	const setNewDate = (date: Date) => setDate(date);
	const setToday = () => setDate(new Date());
	const forwardDays = (n: number) => {
		const settedDate = new Date(date.toISOString())
		settedDate.setDate(settedDate.getDate() + n);
		setDate(settedDate);
	};
	const backwardDays = (n: number) => {
		const settedDate = new Date(date.toISOString())
		settedDate.setDate(settedDate.getDate() - n);
		setDate(settedDate);
	};
	const forwardMonth = () => {
		const settedDate = new Date(date.toISOString())
		settedDate.setMonth(settedDate.getMonth() + 1);
		setDate(settedDate);
	};
	const backwardMonth = () => {
		const settedDate = new Date(date.toISOString())
		settedDate.setMonth(settedDate.getMonth() - 1);
		setDate(settedDate);
	};

	return <DateContext.Provider value={{ date, setNewDate, setToday, forwardDays, backwardDays, forwardMonth, backwardMonth }}>{children}</DateContext.Provider>;
};

export const useDateContext = (): DateContextProps => {
	const context = useContext(DateContext);
	if (!context) {
		throw new Error('useDateContext must be used within a DateProvider');
	}
	return context;
};
