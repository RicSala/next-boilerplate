import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Feedback from '@/components/shared/feedback';
import { AvatarGroup } from '@/components/shared/avatar-group';
import { Faq } from '@/components/marketing/faq';
import { Pricing } from '@/components/marketing/pricing';
import { LogoGrid } from '@/components/marketing/logo-grid';
import { Features } from '@/components/marketing/features';
import Laurels from '@/components/marketing/laurels';
import { Newsletter } from '@/components/marketing/newsletter';
import CtaWithSocial from '@/components/marketing/cta-with-social';
import { auth } from '@/auth';
import { LoginButton } from '@/components/auth/login-button';

export default async function Home() {
    const session = await auth();

    return (
        <div className='gap flex flex-col items-center justify-between'>
            <Button>Button</Button>
            <LoginButton mode='modal'>
                <Button>Entrar</Button>
            </LoginButton>
            <ModeToggle />
            <Avatar>
                <AvatarImage src='/images/placeholders/avatars/avatar-01.jpg' />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <AvatarGroup />
            <Faq />
            <Feedback />
            <LogoGrid />
            <Pricing />
            <Features />
            <Laurels />
            <Newsletter />
            <CtaWithSocial
                accentText={'30% de descuento'}
                buttonLabel={'Comprar'}
                primaryText={'a las primeras 200 compras'}
            />
        </div>
    );
}
