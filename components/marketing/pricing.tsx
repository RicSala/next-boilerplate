import { cn } from '@/lib/utils';
import { appConfig } from '@/config/shipper.appconfig';
// import Highlight from '../utils/highlight';
import { getStripeInstance } from '@/lib/stripe';
import FeaturedLogo from '../icons/featured-logo';
import { CheckoutButton } from './check-out-button';
import Stripe from 'stripe';
import Highlight from '../utils/Hightlight';

export const Pricing = async () => {
    const stripe = await getStripeInstance();
    const productList = await stripe.products.list({
        expand: ['data.default_price'],
    });

    const plans = productList.data.filter((product) =>
        appConfig.productIds.includes(product.id)
    );

    return (
        <section className='flex max-w-7xl flex-col gap-20'>
            <div className='gap2 flex flex-col text-center'>
                <h2 className='border-b-0'>We grow only if you do</h2>
                <div className='text-primary'>
                    <Highlight>Flexible pricing</Highlight>, from easy starters
                    to full corporate plans
                </div>{' '}
            </div>
            {/*TODO: With grid -> <div className="mx-auto grid max-w-sm grid-cols-[repeat(auto-fit,_minmax(min(250px,_100%),_1fr))] justify-center gap-5 sm:max-w-none"> */}

            <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
                {plans.map((plan) => (
                    <PriceCard
                        key={plan.id}
                        name={plan.name}
                        featured={plan.metadata.featured === 'true'}
                        description={plan.description!}
                        features={plan.features}
                        priceId={(plan.default_price! as Stripe.Price).id}
                        price={
                            (plan.default_price! as Stripe.Price).unit_amount!
                        }
                    />
                ))}
                {/* <PriceCard /> */}
            </div>
        </section>
    );
};

type PriceCardProps = {
    className?: string;
    price: number;
    priceId: string;
    name?: string;
    description?: string;
    features?: Stripe.Product.Feature[];
    featured?: boolean;
};

export const PriceCard = ({
    className,
    price,
    priceId,
    name = 'Basic',
    description = 'Best for small business owners, startups who needs landing page for their business.',
    features,
    featured = true,
}: PriceCardProps) => {
    return (
        <div
            className={cn(
                `       
                relative
                mx-auto flex min-w-[min(13rem,_100%)] max-w-[min(24rem,_100%)] flex-col gap-5 rounded-xl border border-border bg-background p-6 text-center
                `,
                featured ? '-order-1 md:bottom-10 md:-order-none' : '',
                featured ? 'border-2 border-primary' : '',
                featured ? 'shadow-xl' : '',
                className
            )}
        >
            {featured ? (
                <FeaturedLogo
                    className={`absolute
      -top-32
      right-2
      -z-10
      rotate-12
      fill-primary/20
      sm:-right-12
      md:-right-20
      
      `}
                />
            ) : null}
            {featured ? (
                <div className='mx-auto -mt-9 rounded-full bg-primary px-2 text-white'>
                    Popular
                </div>
            ) : null}
            <h3 className=''>{name}</h3>
            <p className='text-5xl font-bold'>
                {(price / 100).toFixed().replace('.', ',')}€
            </p>
            <p className=''>{description}</p>

            <div className='flex flex-col gap-0 text-center'>
                <CheckoutButton priceId={priceId}>Get sales now</CheckoutButton>
                <p
                    className='relative text-xs italic
                      text-base-muted-content
                      
        '
                    // before:absolute
                    // before:text-3xl
                    // before:content-[open-quote]
                >
                    This is some cool text to convince you
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Incluye:</p>
                <ul className='space-y-2'>
                    {features!.map((feature) => (
                        <li className='font-sans' key={feature.name}>
                            {feature.name}
                        </li>
                    ))}
                </ul>
            </div>
            {featured ? (
                <div
                    className='absolute -inset-1 -z-10 opacity-50 blur-3xl'
                    style={{
                        background:
                            'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                    }}
                ></div>
            ) : null}
        </div>
    );
};
