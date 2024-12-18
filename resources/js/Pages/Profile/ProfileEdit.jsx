import React from "react";
import { useForm } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ProfileEdit = ({ email, username, phone_number, gender }) => {
    const { data, setData, post, processing, errors } = useForm({
        username: username,
        phone_number: phone_number,
        gender: gender,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        post(route("profile.edit.send"), data, {
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        });
    };

    const handleOtp = (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;

        post(route("profile.edit.otp.send"), {
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        });
    };

    return (
        <div className="flex justify-center">
            <div className="h-fit w-full lg:max-w-[400px]">
                <div className="relative h-[220px] w-full bg-primary">
                    <ChevronLeftIcon
                        className="lef absolute left-5 top-[66px] size-8 cursor-pointer text-white"
                        onClick={() => {
                            window.location.href = "/profile";
                        }}
                    />
                    <p className="pt-16 text-center text-3xl font-semibold text-white">
                        Edit Profile
                    </p>
                </div>
                <div className="relative z-10 mt-[-1.75rem] h-full min-h-[100vh] w-full rounded-t-3xl bg-white px-6">
                    <div className="flex flex-col items-center">
                        <div className="relative z-40 mt-[-3.5rem] h-[120px] w-[120px] overflow-hidden rounded-full">
                            <img src="https://placehold.co/120x120" />
                        </div>
                    </div>
                    <div className="h-max-[230px] w-max-[392px] py-3">
                        <form onSubmit={handleSubmit}>
                        <label className="text-md font-medium">Name</label>
                            <input
                                type="name"
                                id="name"
                                name="username"
                                value={data.username || ""}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                className="mb-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                required
                            />
                            {errors.username && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                            {data.username === "user" && (
                                <p className="mb-2 text-sm text-red-500">
                                    Please change your username.
                                </p>
                            )}
                            <label className="text-md font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="mb-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                value={email || ""}
                                disabled={true}
                                required
                                autoComplete="email"
                            />
                            <label className="text-md font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value="********"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                disabled={true}
                                required
                            />
                            <a
                                onClick={handleOtp}
                                className="group relative mb-8 mt-8 flex h-[48px] items-center rounded-lg border border-slate-300 bg-white px-5 hover:cursor-pointer hover:border-slate-500 hover:bg-slate-50"
                            >
                                <p>Change password</p>
                                <ChevronRightIcon className="absolute right-3 size-6 group-hover:right-1" />
                            </a>
                            <label className="text-md font-medium">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={data.phone_number || ""}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                placeholder="Your phone number"
                                className="mb-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
                                required
                            />
                            {errors.phone_number && (
                                <p className="text-sm text-red-500">
                                    {errors.phone_number}
                                </p>
                            )}

                            <div className="flex flex-col items-center">
                                <label className="text-md w-full text-start font-medium">
                                    Gender
                                </label>
                                <select
                                    className="w-full rounded-md border border-slate-300"
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                    value={data.gender || ""}
                                >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {!data.gender && (
                                    <p className="mt-2 text-sm text-red-500">
                                        Please select a gender.
                                    </p>
                                )}
                            </div>

                            <button
                                type=""
                                disabled={processing}
                                className="my-5 w-full rounded-lg bg-primary2 py-2 text-white"
                            >
                                {processing
                                    ? "Processing..."
                                    : "Update Profile"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
