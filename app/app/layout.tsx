// import Sidebar from '@/components/ui/sidebar';
// import Header from '@/components/ui/header';

import Container from '@/components/shared/container';
import Header from '@/components/shared/header/header';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden'>
            {/* Sidebar */}
            {/* <Sidebar /> */}

            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                {/*  Site header */}
                <Header />

                <main className='gap flex flex-1 flex-col py-12 [&>*:first-child]:scroll-mt-16'>
                    <Container className={''}>{children}</Container>
                </main>
            </div>
        </div>
    );
}
