## USING THIS BOILERPLATE
- Clone the repo doing `git clone https://github.com/RicSala/next-boilerplate.git [NAME_OF_YOUR_PROJECT]`
- Go to the project folder `cd [NAME_OF_YOUR_PROJECT]`
- Delete the git folder `rm -rf .git` (this will delete the link with this remote and the history)
- Init a new git project `git init`
- Open the project on VSC `code .`
- Stage and commit the project `git add . && git -m commit "First commit"`
- Install dependencies `npm i`
- Create the .env file

## LIBRARIES USED

-   [CVA](https://cva.style/docs)
    For creating type-safe variants of the components. Helps keeping the components consistent and easy to use.
-   [Radix](https://www.radix-ui.com)
    Unstyled components perfectly design with accessibility in mind
-   [TailwindMerge] (https://github.com/dcastil/tailwind-merge/blob/v2.1.0/docs/what-is-it-for.md)
    Allows merging tailwind classes avoiding conflicts and applyint the order of the classes instead of the tailwind order.

-   [Auth.js] (https://authjs.dev/getting-started/introduction)
    A simple, lightweight, promise-based library for handling authentication in JavaScript applications.

-   [Prisma] (https://www.prisma.io/)
    Next-generation ORM that makes it easy to build fast, reliable, and scalable Node.js applications with TypeScript and SQL.
    Use Mongo as database.

-   [React Hook Form] (https://www.react-hook-form.com/)
    Performant, flexible and extensible forms with easy-to-use validation.

-   [Shadcn] (https://ui.shadcn.com/)
    A collection of React components built with Radix, installed in your own project and highly customizable.

## COLORS

I have tried several ways to add colors, and make them semantic, but create all the variants (correctly) is no reasonable manually. Until I found a way to assign semantic names (i.e. "primary", "primary-soft", "primary-softer") tailwind colors programatically, I suggest:

-   Use the shadcn colors as they are.
-   Then, after project is more advanced, fine tune the colors and create the variants you need.
    This is also good for not rely too much on colors to emphasize, but on other ways like shadows, borders, icons, width, etc.
