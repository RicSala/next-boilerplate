import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ApiRequestBody, ApiResponse } from '@/types/types';
import { register } from '@/actions/register-user';
import { User } from '@prisma/client';
import { RegisterFormValues } from '@/schemas/auth-schemas';
import { wait } from '@/lib/utils';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action }: { action: RouteActions } = body;

        let resData;
        let resMessage: string;

        switch (action) {
            case 'CREATE':
                await wait(3000);
                const {
                    data: { email, password, name, confirmPassword },
                }: RegisterReq<'CREATE'> = body;

                if (!email || !password || !name) {
                    return NextResponse.json(
                        { error: 'Datos incorrectos, prueba de nuevo' },
                        { status: 400 }
                    );
                }

                if (password !== confirmPassword) {
                    return NextResponse.json(
                        { error: 'Las contraseñas no coinciden' },
                        { status: 400 }
                    );
                }

                const hashedPassword = await bcrypt.hash(password, 12);

                const user = await register(name, email, hashedPassword);

                const frontEndUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };

                const res: RegisterRes<'CREATE'> = {
                    data: frontEndUser,
                    ok: true,
                    message: 'Usuario creado correctamente',
                    statusCode: 201,
                };

                return NextResponse.json(res, { status: 201 });
            default:
                break;
        }
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

// export async function PUT(req) {
//     const currentUser = await getCurrentUser(req);

//     if (!currentUser) {
//         return NextResponse.redirect('/login');
//     }

//     try {
//         const body = await req.json();

//         const {
//             email,
//             password,
//             name,
//             confirmPassword,
//             role = 'CLIENT',
//             darkMode,
//         } = body;

//         let data = {};

//         const settings = UserService.settingsUpdate(currentUser.id, data);

//         return NextResponse.json({ settings }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Something went wrong' },
//             { status: 500 }
//         );
//     }
// }

type RouteApiMap = {
    CREATE: {
        reqData: RegisterFormValues;
        resData: Pick<User, 'name' | 'email' | 'id'>;
    };
    // UPDATE: {
    //     reqData: StudioFormValues;
    //     resData: Studio;
    // };
};

type RouteActions = keyof RouteApiMap;

export type RegisterRes<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiResponse<RouteApiMap[A]['resData']>;

export type RegisterReq<A extends RouteActions> = // Generic type whose value is one of the actions
    ApiRequestBody<RouteApiMap[A]['reqData'], A>;
