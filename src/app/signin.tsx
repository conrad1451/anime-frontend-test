import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import authImg from "../assets/images/gotten.png";
import logo from "../assets/images/anime_logo.png";
import { Input } from "./components";
import { useStore } from "./store/store";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

	const navigate = useNavigate();
	const {signIn} = useStore()
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const errRef = useRef();

	const { 
		handleSubmit, 
		register, 
		formState: { errors, isSubmitting }	} = useForm({ mode: "onChange", reValidateMode: "onChange" })

	const onSubmit = async (data) => {

		// CHQ: Here we print the details that the user has entered to the console.
		console.log({ email: data.email, username: data.username, password: data.password })

		// CHQ: Here we pass in the details that the user has entered "signIn". This function returns 
		// a promise that is resolved as either a success (user authenticated, successful login) or 
		// failure (user not authenticated, invalid login)
		const res = await signIn(data.email, data.username, data.password)
		console.log(res)

		if (res) {
			toast.success("Successful Login");
			navigate("/dashboard");
		} else {
			toast.error("Invalid Login");
		}
	}

	return (
		<>
			<main className="w-full h-full lg:flex">
				<div className="w-1/2 h-screen p-16 bg-[#FBF9F9] lg:grid lg:place-items-center lg:text-center xs:hidden">
					<h1 className="text-[#CF3D0C] font-medium text-[40px] leading-10">
						Anime Stash
					</h1>
					<img src={authImg} width={280} alt="" />
					<p className="text-[28px] text-[#101828]">
						Easiest way to track all your favorite anime series, characters and books 
					</p>
				</div>
				<div className="lg:w-1/2 h-screen p-16 grid place-items-center">
					<div className="flex items-center gap-5">
						<img src={logo} alt="logo" width="200" height="200" />
						<h1 className="text-xl leading-[22px] font-semibold text-[#601800] w-[50px]">
							Anime Stash
						</h1>
					</div>
					<section className="border border-[#D8DDE6] p-6 rounded box-border w-96">
						<form
							className="grid space-y-4 text-sm text-[#102954]"
							onSubmit={handleSubmit(onSubmit)}
						>
							<p
								ref={errRef}
								className={
									errMsg
										? "errmsg p-2 mb-2 font-medium bg-[#ffb6c1] text-[#b222222] text-xs"
										: "offscreen absolute left-[-9999px]"
								}
								aria-live="assertive"
							>
								{errMsg}
							</p>
							<div className="grid space-y-4">
								{/* email input field */}
								<div className="relative grid gap-1">
									<Input
										label="email"
										name="username"
										fields={register("email", {
											required: {
												value: true,
												message: "Invalid email format"
											},
											pattern: /^\S+@\S+\.\S+$/
										})}
										onChange={() => setErrMsg("")}
									/>
									{errors && errors?.username && (
										<p className="text-red-600 text-xs">{"Invalid username"}</p>
									)}
								</div>

								{/* username input field */}
								<div className="relative grid gap-1">
									<Input
										label="username"
										name="username"
										fields={register("username", {
											required: {
												value: true,
												message: "Invalid string"
											},
											pattern: /^\S+/
										})}
										onChange={() => setErrMsg("")}
									/>
									{errors && errors?.username && (
										<p className="text-red-600 text-xs">{"Invalid email"}</p>
									)}
								</div>

								{/* password input field */}
								<div className="relative grid gap-1">
									<div className="relative">
										<Input
											label="password"
											type={showPassword ? "text" : "password"}
											name="password"
											fields={register("password", { 
												required: {
													value: true,
													message: "Password is required"
												}, 
												minLength: 4 
											})}
											onChange={() => setErrMsg("")}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault(); // prevent the form from submitting immediately
													setTimeout(() => handleSubmit(onSubmit)(), 0); // submit after a slight delay
												}
											}}
										/>
										<div 
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-0 top-1/2 transform translate-y-1/2 mr-3 cursor-pointer text-gray-500"
										>
												{showPassword ?  <FaEye color="#ABB3BF" /> : <FaEyeSlash color="#ABB3BF" />}
										</div>
									</div>
									{errors && errors?.password && (
										<p className="text-red-600 text-xs">{"Invalid password"}</p>
									)}
								</div>
							</div>

							{/* login button */}
							<button disabled={isSubmitting} type="submit" className="w-full bg-[#CF3D0C] text-white rounded h-10 flex items-center justify-center">
								{loading && (
									<svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								)}
								<p>Log In</p>
							</button>
						</form>
					</section>
				</div>
			</main>
		</>
	);
};

export default SignIn;