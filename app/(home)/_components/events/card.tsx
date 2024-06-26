import Link from 'next/link';
import React from 'react';

import { EventFilters } from '@/(home)/_components/events/mocks';
import { Event } from '~/lib/types/events';
import { dateToRuFormat } from '~/lib/utils/helpers';

function EventCard({ slug, date, title, text, link, filters }: Event) {
    if (link) {
        return (
            <Link
                key={slug}
                href={link}
                target="_blank"
                className="bg-blue-bg p-5 shadow transition hover:shadow-lg"
            >
                <div className="mb-2.5 font-inter text-[13px] font-bold text-blue-light">
                    {dateToRuFormat(date)}
                </div>
                <div className="mg:text-2xl mb-2 font-inter text-xl font-bold text-blue-dark">
                    {title}
                </div>
                <div className="mb-3.5 font-inter text-sm font-light">{text}</div>
                <div className="flex space-x-4">
                    {filters.split(',').map((filter: string) => (
                        <div
                            key={filter}
                            className="font-inter text-[13px] font-bold uppercase text-blue-light"
                        >
                            {EventFilters.find(item => (item.type as string) === filter)?.title}
                        </div>
                    ))}
                </div>
            </Link>
        );
    }
    return (
        <div key={slug} className="bg-blue-bg p-5 shadow transition hover:shadow-lg">
            <div className="mb-2.5 font-inter text-[13px] font-bold text-blue-light">
                {dateToRuFormat(date)}
            </div>
            <div className="mg:text-2xl mb-2 font-inter text-xl font-bold text-blue-dark">
                {title}
            </div>
            <div className="mb-3.5 font-inter text-sm font-light">
                {/* eslint-disable-next-line xss/no-mixed-html */}
                <span dangerouslySetInnerHTML={{ __html: text }} />
            </div>
            <div className="flex space-x-4">
                {filters.split(',').map((filter: string) => (
                    <div
                        key={filter}
                        className="font-inter text-[13px] font-bold uppercase text-blue-light"
                    >
                        {EventFilters.find(item => (item.type as string) === filter)?.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventCard;
