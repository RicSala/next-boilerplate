// "CATCH ALL ERROS" file

// About error.js files:
// "route" error files should be named "error.js" and will create an error boundary for the routes in that segment (excep those thrown in the layout - for those, use the error in the parent segment)

'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // In server components, the message will be a generic one to avoid leaking sensitive details
    const { message } = error;

    return (
        <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    );
}
