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
                            <svg
                                xmlns="http://www.w4.org/2000/svg"
                                width="120"
                                height="120"
                                viewBox="0 0 120 120"
                            >
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="#DDDDDD"
                                />
                                <path
                                    fill="#999999"
                                    d="M29.505 64.305h2.08v1.48h-6.4v-1.48h2.35v-6.74q0-.4.02-.83l-1.66 1.39q-.15.12-.29.14-.14.03-.26.01-.13-.03-.22-.09-.1-.06-.15-.13l-.62-.85 3.53-3h1.62v10.1Zm7.96-.36h2.97q.32 0 .51.18t.19.48v1.18h-7.94v-.66q0-.2.08-.42.09-.22.27-.39l3.51-3.52q.44-.45.79-.86.35-.41.58-.81.23-.4.36-.81.12-.41.12-.87 0-.41-.12-.73-.12-.31-.34-.53-.22-.22-.53-.32-.3-.11-.69-.11-.35 0-.65.1-.3.1-.53.28-.23.18-.39.42t-.24.53q-.14.36-.36.48-.21.12-.62.06l-1.04-.18q.12-.84.46-1.46.35-.63.86-1.05.52-.42 1.19-.63.67-.22 1.43-.22.8 0 1.47.24.66.24 1.13.67.48.43.74 1.04.26.61.26 1.35 0 .64-.18 1.18-.19.55-.51 1.04-.31.5-.74.96-.42.47-.89.95l-2.6 2.66q.37-.11.74-.17.38-.06.71-.06Zm13.28-3.94q0 1.51-.32 2.62-.33 1.12-.9 1.85-.57.73-1.35 1.08-.78.36-1.68.36-.91 0-1.68-.36-.77-.35-1.34-1.08-.57-.73-.89-1.85-.32-1.11-.32-2.62 0-1.52.32-2.64.32-1.11.89-1.84.57-.72 1.34-1.08.77-.36 1.68-.36.9 0 1.68.36.78.36 1.35 1.08.57.73.9 1.84.32 1.12.32 2.64Zm-2.04 0q0-1.26-.18-2.08-.19-.83-.49-1.32-.31-.48-.71-.68-.4-.2-.83-.2-.43 0-.82.2-.4.2-.7.68-.31.49-.49 1.32-.18.82-.18 2.08 0 1.25.18 2.08.18.82.49 1.31.3.49.7.68.39.2.82.2.43 0 .83-.2.4-.19.71-.68.3-.49.49-1.31.18-.83.18-2.08Zm14.75 3.13-1.05 1.03-2.71-2.71-2.74 2.73-1.05-1.03 2.74-2.75-2.61-2.6 1.04-1.04 2.61 2.6 2.59-2.59 1.06 1.04-2.6 2.6 2.72 2.72Zm10.95 1.17h2.08v1.48h-6.4v-1.48h2.34v-6.74q0-.4.03-.83l-1.67 1.39q-.14.12-.28.14-.14.03-.27.01-.12-.03-.22-.09-.09-.06-.14-.13l-.62-.85 3.52-3h1.63v10.1Zm7.96-.36h2.97q.32 0 .5.18.19.18.19.48v1.18h-7.93v-.66q0-.2.08-.42.08-.22.27-.39l3.51-3.52q.44-.45.79-.86.35-.41.58-.81.23-.4.35-.81.13-.41.13-.87 0-.41-.12-.73-.12-.31-.34-.53-.22-.22-.53-.32-.31-.11-.69-.11-.35 0-.65.1-.3.1-.54.28-.23.18-.39.42t-.24.53q-.13.36-.35.48-.22.12-.62.06l-1.04-.18q.12-.84.46-1.46.34-.63.86-1.05.52-.42 1.18-.63.67-.22 1.44-.22.8 0 1.46.24.67.24 1.14.67.47.43.74 1.04.26.61.26 1.35 0 .64-.19 1.18-.19.55-.5 1.04-.32.5-.74.96-.43.47-.89.95l-2.61 2.66q.38-.11.75-.17.37-.06.71-.06Zm13.28-3.94q0 1.51-.33 2.62-.32 1.12-.89 1.85-.57.73-1.35 1.08-.78.36-1.69.36-.9 0-1.67-.36-.78-.35-1.34-1.08-.57-.73-.89-1.85-.32-1.11-.32-2.62 0-1.52.32-2.64.32-1.11.89-1.84.56-.72 1.34-1.08.77-.36 1.67-.36.91 0 1.69.36.78.36 1.35 1.08.57.73.89 1.84.33 1.12.33 2.64Zm-2.04 0q0-1.26-.19-2.08-.18-.83-.49-1.32-.31-.48-.71-.68-.4-.2-.83-.2-.42 0-.82.2-.39.2-.7.68-.3.49-.48 1.32-.18.82-.18 2.08 0 1.25.18 2.08.18.82.48 1.31.31.49.7.68.4.2.82.2.43 0 .83-.2.4-.19.71-.68.31-.49.49-1.31.19-.83.19-2.08Z"
                                />
                            </svg>
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
                                <p className="text-red-500">
                                    {errors.username}
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
