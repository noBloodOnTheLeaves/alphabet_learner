'use client';

import FeedbackIcon from "@/app/components/icons/FeedbackIcon";
import { Button, Dialog, DialogPanel, Fieldset, Label, Field, Description, Legend, Input, Textarea, Transition } from "@headlessui/react";
import { useState } from "react";
import clsx from 'clsx'
import Check from "../../icons/CheckIcon";

export default function FeedbackButton(props) {
    let [isOpen, setIsOpen] = useState(false)
    let [loading, setLoading] = useState(false)
    let [isSuccess, setSuccess] = useState(false)
    const [form, setForm] = useState({
        email: '',
        message: '',
    });

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
        setSuccess(false)
        setForm({
            email: '',
            message: '',
        })
    }

    const telegramSendMessage = async text => {
        return fetch(
            `https://api.telegram.org/bot5438904547:AAGhmNpZ5yoikPzJPN1L1X81pFny6fpzNCw/sendMessage?chat_id=856091201&text=${text}`,
        );
    };

    const sendTgMessage = async event => {
        event.preventDefault();
        setLoading(true)

        await telegramSendMessage(`Alphabet learner: %0A Contact: ${form.email} %0A Message: ${form.message}`)
            .then(e => {
                setLoading(false)
                setSuccess(true)
            }).catch(e => {
                console.log(e);
                setLoading(false)
                setSuccess(false)
            });
    };

    const onFormChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };


    return (
        <>
            <Button
                onClick={open}
                className="fixed cursor-pointer top-4 right-4 mt-2 px-2 py-2 rounded-full border border-neutral-300 bg-white text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
            >
                <FeedbackIcon />

            </Button>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 backdrop-blur-md bg-white/20 w-screen overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-gray-950 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6">
                                {loading ?
                                    <div role="status" className="max-w-sm animate-pulse">
                                        <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-50 mb-4"></div>
                                        <div className="h-30 bg-gray-200 rounded dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                        <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 mb-2.5 w-20"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                     
                                        <div>
                                            
                                        <Transition show={isSuccess}>
                                        <div className="m-20 flex flex-col items-center">
                                        <div className="size-[6.25rem]">
                                            <div
                                                className={clsx(
                                                    'size-full rounded-full bg-white shadow-lg transition duration-400',
                                                    'data-closed:scale-50 data-closed:rotate-[-120deg] data-closed:opacity-0',
                                                    'data-leave:duration-200 data-leave:ease-in-out',
                                                    'data-leave:data-closed:scale-95 data-leave:data-closed:rotate-[0deg]',
                                                    'flex items-center justify-center'
                                                )}
                                            >
                                                <Check width={80} height={80}/>
                                            </div>
                                            </div>
                                            <h1 className=" text-2xl font-semibold text-white mt-3">Thank you!</h1>
                                            </div>
                                        </Transition>
                                       
                                       { isSuccess ? null : <div>
                                        <Legend className="text-base/7 font-semibold text-white">Feedback Form </Legend>
                                        <Field>
                                            <Label className="text-sm/6 font-medium text-white">Email or any contact</Label>
                                            <Input
                                                type="email"
                                                value={form.email}
                                                name="email"
                                                onChange={e => {
                                                    onFormChange('email', e.target.value);
                                                }}
                                                className={clsx(
                                                    'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                )}
                                            />
                                        </Field>
                                        <Field>
                                            <Label className="text-sm/6 font-medium text-white">Message</Label>
                                            <Description className="text-sm/6 text-white/50">
                                                Thank you for your help. Giving your feedback you help this small app become better.
                                            </Description>
                                            <Textarea
                                                value={form.message}
                                                onChange={e => {
                                                    onFormChange('message', e.target.value);
                                                }}
                                                name="message"
                                                className={clsx(
                                                    'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                                                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                                )}
                                                rows={3}
                                            />
                                        </Field>
                                        <Button
                                            className="mt-3 inline-flex cursor-pointer data-disabled:cursor-not-allowed items-center gap-2 px-2 py-2 rounded border border-neutral-300 bg-white text-neutral-500 text-sm enabled:hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                                            disabled={
                                                form.email === '' ||
                                                form.message === ''
                                            }
                                            onClick={sendTgMessage}
                                        >
                                            Send <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                                                <path d="M2.50002 12.0957C2.50002 6.849 6.75332 2.5957 12 2.5957C17.2467 2.5957 21.5 6.849 21.5 12.0957C21.5 17.3424 17.2467 21.5957 12 21.5957H3.25002C2.94668 21.5957 2.6732 21.413 2.55711 21.1327C2.44103 20.8525 2.50519 20.5299 2.71969 20.3154L4.77303 18.262C3.35633 16.603 2.50002 14.4488 2.50002 12.0957ZM7.75 9.84668C7.33579 9.84668 7 10.1825 7 10.5967C7 11.0109 7.33579 11.3467 7.75 11.3467H16.25C16.6642 11.3467 17 11.0109 17 10.5967C17 10.1825 16.6642 9.84668 16.25 9.84668H7.75ZM7 13.5967C7 14.0109 7.33579 14.3467 7.75 14.3467H12.75C13.1642 14.3467 13.5 14.0109 13.5 13.5967C13.5 13.1825 13.1642 12.8467 12.75 12.8467H7.75C7.33579 12.8467 7 13.1825 7 13.5967Z" fill="#000000" />
                                            </svg>

                                        </Button>
                                        </div>  } 
                                        </div>
                                }
                            </Fieldset>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
