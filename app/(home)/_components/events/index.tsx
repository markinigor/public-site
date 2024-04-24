'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import { EventFilters, Events as EventsItems, EventTabs } from '@/(home)/_components/events/mocks';
import { Event } from '~/lib/types/events';

export function Events() {
    const [tab, setTab] = useState('soon');
    const [filter, setFilter] = useState('all');
    const [items, setItems] = useState(EventsItems.filter(item => (item.tab as string) === tab));

    const changeTab = (tab: string, filter: string) => {
        setTab(tab);
        setFilter(filter);

        if (filter === 'all') {
            setItems(EventsItems.filter(item => (item.tab as string) === tab));
            return;
        }

        setItems(
            EventsItems.filter(
                item => (item.tab as string) === tab && item.filters.includes(filter)
            )
        );
    };

    return (
        <div className="w-full">
            <div className="container mx-auto pb-32 pt-11">
                <div className="mb-16 text-center font-inter text-[42px] font-bold text-blue">
                    Ближайшие онлайны и офлайны
                </div>

                <div className="mb-8 flex justify-center">
                    {EventTabs.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            className={clsx(
                                'w-[280px] border border-blue-dark p-3.5 font-inter text-sm font-bold transition hover:bg-blue-dark hover:text-white',
                                tab === (item.type as string)
                                    ? 'bg-blue-dark text-white'
                                    : 'text-blue-dark',
                                index === 0 ? 'rounded-l-[30px]' : 'rounded-r-[30px]'
                            )}
                            onClick={() => changeTab(item.type, filter)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <div className="mb-16 flex justify-center space-x-2.5">
                    {EventFilters.map(item => (
                        <button
                            key={item.id}
                            type="button"
                            className={clsx(
                                `rounded-[40px] border border-blue-light px-4 py-1.5 font-inter text-sm font-bold transition hover:bg-blue-light hover:text-white`,
                                filter === (item.type as string)
                                    ? `bg-blue-light text-white`
                                    : `text-blue-light`
                            )}
                            onClick={() => changeTab(tab, item.type)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                {items.length > 0 && (
                    <div className="grid grid-cols-3 gap-x-10 gap-y-20">
                        {items.map(({ id, date, title, text, link, filters }: Event) => (
                            <Link
                                key={id}
                                href={link}
                                className="bg-blue-bg p-5 shadow transition hover:shadow-lg"
                            >
                                <div className="mb-2.5 font-inter text-[13px] font-bold text-blue-light">
                                    {date}
                                </div>
                                <div className="mb-2 font-inter text-2xl font-bold text-blue-dark">
                                    {title}
                                </div>
                                <div className="mb-3.5 font-inter text-sm font-light">{text}</div>
                                <div className="flex space-x-4">
                                    {filters.map((filter: string, index) => (
                                        <div
                                            key={index}
                                            className="font-inter text-[13px] font-bold uppercase text-blue-light"
                                        >
                                            {
                                                EventFilters.find(
                                                    item => (item.type as string) === filter
                                                )?.title
                                            }
                                        </div>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {items.length === 0 && (
                    <div className="flex min-h-[378px] w-full items-center justify-center border border-gray">
                        <div className="font-inter font-light text-gray">Ничего не найдено</div>
                    </div>
                )}
            </div>
        </div>
    );
}