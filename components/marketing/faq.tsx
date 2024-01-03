import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function Faq() {
    return (
        <section
            className='max-w-5xl
        '
        >
            <div className='flex flex-col flex-wrap items-baseline gap-5 lg:flex-row'>
                <div className='flex-1'>
                    <h2 className='border-0'>Preguntas frecuentes</h2>
                    <p>
                        {' '}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ex accusantium inventore similique molestiae provident
                        sapiente odio facere, consequuntur enim quasi dolores
                        eos quod minus atque possimus tenetur unde voluptatem
                        culpa.{' '}
                    </p>
                </div>
                <Accordion type='single' collapsible className='w-full flex-1'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the
                            other components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-6'>
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-5'>
                        <AccordionTrigger>Is it animated?32</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}
