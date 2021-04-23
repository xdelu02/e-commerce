import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(user) {

		if (user.password !== user.passwordConfirmation) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(user.email, user.password);
			fetch(
				"https://ecommerce.ideeinbit.it/api/clienti/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: user.email,
						nome: user.name,
						cognome: user.lastName,
						dataN: user.birthDate,
					}),
				}
			).then((res) => {
				console.log(res.json());
				history.push("/");
			});
			
		} catch {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<div>
			<h1>Sign Up</h1>
			<Formik
				initialValues={{
					name: "",
					lastName: "",
					birthDate: "",
					email: "",
					password: "",
					passwordConfirmation: "",
				}}
				onSubmit={async (values) => {
					handleSubmit(values);
				}}
			>
				<Form>
					<label htmlFor="name">Name</label>
					<Field id="name" name="name" placeholder="e.g Piero" />

					<label htmlFor="lastName">Last name</label>
					<Field
						id="lastName"
						name="lastName"
						placeholder="e.g Joe"
					/>

					<label htmlFor="birthDate">Birth date</label>
					<Field
						id="birthDate"
						name="birthDate"
						placeholder="01/01/2000"
					/>

					<label htmlFor="lastName">Email</label>
					<Field
						id="email"
						name="email"
						placeholder="jane@acme.com"
						type="email"
					/>
					<label htmlFor="password">password</label>
					<Field id="password" name="password" type="password" />
					<label htmlFor="passwordConfirmation">
						Password Confirmation
					</label>
					<Field
						id="passwordConfirmation"
						name="passwordConfirmation"
						type="password"
					/>
					<button disabled={loading} type="submit">
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}
