// src/components/RenderText.js
import React from 'react';
import DOMPurify from 'dompurify';

function convertUrlsToLinks(text) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function RenderText({ text }) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(convertUrlsToLinks(text)),
            }}
        />
    );
}

export default RenderText

