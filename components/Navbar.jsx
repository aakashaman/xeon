'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '@/redux/features/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user: stateUser } = useSelector((state) => state.auth);

  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(loginUser(user));
    }
  }, []);

  function closeModal() {
    setIsRegister(false);
    setIsLogin(false);
  }

  function openModal(modal) {
    if (modal === 'register') {
      setIsRegister(true);
    } else {
      setIsLogin(true);
    }
  }

  const handleRegister = () => {
    dispatch(registerUser(user));
    closeModal();
  };

  const handleLogin = () => {
    dispatch(loginUser(user));
    closeModal();
  };

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
              className="h-8 mr-3 text-slate-500"
              alt=""
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-500 ">
              Xeon Contacts
            </span>
          </a>

          <div className="flex items-center -mx-2">
            {stateUser && stateUser.user?.id ? (
              <a
                href="#"
                className="mx-4 px-4 py-2 text-sm font-medium text-gray-700 rounded border hover:bg-gray-100 "
                onClick={() => dispatch(logoutUser())}
              >
                Log Out
              </a>
            ) : (
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => openModal('register')}
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      <Transition appear show={isRegister} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Register Form
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="key"
                            value={user.userName}
                            onChange={(e) =>
                              setUser({ ...user, userName: e.target.value })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            value={user.userEmail}
                            onChange={(e) =>
                              setUser({ ...user, userEmail: e.target.value })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            value={user.userPassword}
                            onChange={(e) =>
                              setUser({ ...user, userPassword: e.target.value })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleRegister}
                    >
                      Submit
                    </button>

                    <div className="clear-both">
                      <span className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <a
                          href="#"
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => {
                            closeModal();
                            setTimeout(() => {
                              openModal('login');
                            }, 200);
                          }}
                        >
                          Login here
                        </a>
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ------------------- */}
      <Transition appear show={isLogin} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Login Form
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            value={user.userEmail}
                            onChange={(e) =>
                              setUser({ ...user, userEmail: e.target.value })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            value={user.userPassword}
                            onChange={(e) =>
                              setUser({ ...user, userPassword: e.target.value })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleLogin}
                    >
                      Submit
                    </button>

                    <div className="clear-both">
                      <span className="text-sm text-gray-500">
                        Dont have an account?{' '}
                        <a
                          href="#"
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => {
                            closeModal();
                            setTimeout(() => {
                              openModal('register');
                            }, 200);
                          }}
                        >
                          Register here
                        </a>
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Navbar;
