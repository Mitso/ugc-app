import type { Route } from "../views/+types/About";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "About" },
        {   name: "Description", 
            content: "About - Welcome to React Router!" 
        },
    ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    let formData = await request.formData();
    let userData = {
        name: formData.get('name') || '',
        surname: formData.get('surname') || '', 
        mobile: formData.get('mobile') || '',
        email_address: formData.get('email') || '', 
        username: formData.get('username') || '', 
        password:formData.get('password') || '', 
    }

    try {
       return  await fetch('http://localhost:3000/signup', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body:  JSON.stringify({...userData})
        }).then(async res => await res.json())
    } catch(err) {
        console.error(err)
    }
}

function About ({ actionData }: Route.ComponentProps) {
    return (
        <>
            <div className="about px-5">
                <div className="intro">
                    <h1 className="heading">About</h1>
                </div>
                <Form method="post" className="w-[350px]">
                    <fieldset className="py-2 flex justify-end">
                        <label htmlFor="name">First name</label>
                        <input type="text" id="name" className="border" name="name"></input>
                    </fieldset>
                    <fieldset className="py-2 flex justify-end">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" id="surname" className="border" name="surname"></input>
                    </fieldset>
                    <fieldset className="py-2 flex justify-end">
                        <label htmlFor="mobile">Contact number</label>
                        <input type="text" id="mobile" className="border" name="mobile"></input>
                    </fieldset>
                    <fieldset className="py-2 flex justify-end">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" className="border" name="email"></input>
                    </fieldset>
                    <fieldset className="py-2 flex justify-end">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="border" name="username"></input>
                    </fieldset>
                    <fieldset className="py-2 flex justify-end">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" className="border" name="password"></input>
                    </fieldset>
                    <button type="submit">Submit regitration</button>
                </Form>
                {/* {actionData ? (
                    <p>{actionData?.message}</p>
                ) : null} */}
            </div>
        </>
    )
};

export default About;