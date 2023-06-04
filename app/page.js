'use client';

import Navbar from '@/components/Navbar';
import {
  addContact,
  deleteContact,
  updateContact,
} from '@/redux/features/contactSlice';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { contact: ct } = useSelector((state) => state.contactData);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState('');

  const [selectedId, setSelectedId] = useState('');

  const [userPassword, setUserPassword] = useState('');

  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    setContacts(user?.user?.contacts);
  }, [user]);

  function closeModal() {
    setIsEdit(false);
    setIsOpen(false);
    setIsDelete(false);
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className=" flex gap-3 justify-center items-center">
            <div>
              <button
                className="bg-slate-400 p-2 rounded-lg hover:bg-slate-600 text-white cursor-pointer disabled:cursor-not-allowed"
                onClick={() => {
                  openModal(true);
                  setContact({
                    name: params.row.name,
                    email: params.row.email,
                    phone: params.row.phone,
                    address: params.row.address,
                  });
                  setId(params.row.id);
                }}
              >
                Edit
              </button>
            </div>
            <div>
              <button
                className="bg-red-400 p-2  rounded-lg hover:bg-red-600 text-white cursor-pointer disabled:cursor-not-allowed"
                onClick={() => {
                  setIsDelete(true);
                  setSelectedId(params.row.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  function openModal(edit) {
    if (edit === true) {
      setIsEdit(true);
    } else {
      setIsOpen(true);
      setContact({
        name: '',
        email: '',
        phone: '',
        address: '',
        ...contacts,
      });
    }
  }

  const formController = async () => {
    dispatch(
      addContact({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,

        userId: user?.user?.id,
        userPassword,
      })
    );

    if (ct?.contact?.id) {
      setContacts([
        ...contacts,
        {
          id: contactData?.contact?.contact?.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          userId: user?.user?.id,
          createdAt: contactData?.contact?.contact?.createdAt,
          updatedAt: contactData?.contact?.contact?.updatedAt,
        },
      ]);
    }

    closeModal();
  };

  const deleteDocument = async () => {
    dispatch(
      deleteContact({
        contactId: selectedId,
        userId: user?.user?.id,
        userPassword,
      })
    );

    const newContacts = contacts.filter((item) => item.id !== selectedId);
    setContacts(newContacts);
    closeModal();
  };

  const updateData = async () => {
    const contactId = id;

    dispatch(
      updateContact({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        contactId,
        userId: user?.user?.id,
        userPassword,
      })
    );

    const newContacts = contacts.filter((item) => item.id !== contactId);
    setContacts([
      ...newContacts,
      {
        id: contactId,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        userId: user?.user?.id,
        createdAt: ct?.contact?.contact?.createdAt,
        updatedAt: ct?.contact?.contact?.updatedAt,
      },
    ]);

    closeModal();
  };

  return (
    <>
      <Navbar />

      <div>
        {user && user?.user?.id ? (
          <div className="mt-16">
            <div className="w-[90vw] mx-auto  flex flex-row-reverse">
              <button
                className="text-black px-3 py-2 mb-5 rounded-lg bg-slate-200 hover:bg-slate-400 border  cursor-pointer disabled:cursor-not-allowed ms-auto"
                onClick={openModal}
              >
                Add Data
              </button>
            </div>
            <div className="w-[90vw] mx-auto">
              <Box
               
              >
                <DataGrid
                  components={{ Toolbar: GridToolbar }}
                  rows={contacts || []}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </div>
          </div>
        ) : (
          <div className="w-[90vw] mx-auto text-center">
            <section className="bg-gray-100 text-white py-2 mt-4 w-full sm:h-[85vh] min:h-screen  ">
              <div className="container mx-auto flex flex-wrap items-center">
                <div className="w-full md:w-1/2 mt-16">
                  <h1 className="text-5xl font-bold mb-4 text-gray-500">
                    Welcome to Xeon
                  </h1>
                  <p className="text-xl mb-transperent phonebook8 text-gray-400">
                    All your contacts in one place
                  </p>
                  <button className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4">
                    Get Started
                  </button>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <img
                    style={{
                      marginTop: "100px",

                      width: "400px",
                      height: "400px",
                    }}
                    alt="Unicorn"
                    src="phonebook.png"
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
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
                    Add Your Contact
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
                            name="key"
                            id="key"
                            value={contact.name}
                            onChange={(e) =>
                              setContact({ ...contact, name: e.target.value })
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
                            value={contact.email}
                            onChange={(e) =>
                              setContact({ ...contact, email: e.target.value })
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
                          Phone
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            value={contact.phone}
                            onChange={(e) =>
                              setContact({ ...contact, phone: e.target.value })
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>

                        <div className="my-3">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address
                          </label>

                          <div className="mt-1">
                            <input
                              type="text"
                              name="address"
                              id="address"
                              value={contact.address}
                              onChange={(e) =>
                                setContact({
                                  ...contact,
                                  address: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                            />
                          </div>
                        </div>
                      </div>

                      {contact.name &&
                      contact.email &&
                      contact.phone &&
                      contact.address ? (
                        <div className="my-3">
                          <label
                            htmlFor="pass"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>

                          <div className="mt-1">
                            <input
                              type="text"
                              name="pass"
                              id="pass"
                              placeholder="Enter your password to verify"
                              value={userPassword}
                              onChange={(e) => setUserPassword(e.target.value)}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={formController}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ------------------------------------- */}
      <Transition appear show={isEdit} as={Fragment}>
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
                    Edit Your Data
                  </Dialog.Title>
                  <div className="mt-2">
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
                              name="key"
                              id="key"
                              value={contact.name}
                              onChange={(e) =>
                                setContact({ ...contact, name: e.target.value })
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
                              value={contact.email}
                              onChange={(e) =>
                                setContact({
                                  ...contact,
                                  email: e.target.value,
                                })
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
                            Phone
                          </label>

                          <div className="mt-1">
                            <input
                              type="text"
                              name="value"
                              id="value"
                              value={contact.phone}
                              onChange={(e) =>
                                setContact({
                                  ...contact,
                                  phone: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                            />
                          </div>

                          <div className="my-3">
                            <label
                              htmlFor="key"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>

                            <div className="mt-1">
                              <input
                                type="text"
                                name="value"
                                id="value"
                                value={contact.address}
                                onChange={(e) =>
                                  setContact({
                                    ...contact,
                                    address: e.target.value,
                                  })
                                }
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                              />
                            </div>
                          </div>

                          {contact.name &&
                          contact.email &&
                          contact.phone &&
                          contact.address ? (
                            <div className="my-3">
                              <label
                                htmlFor="pass"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Password
                              </label>

                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="pass"
                                  id="pass"
                                  placeholder="Enter your password to verify"
                                  value={userPassword}
                                  onChange={(e) =>
                                    setUserPassword(e.target.value)
                                  }
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => updateData()}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ------------------------------------- */}

      <Transition appear show={isDelete} as={Fragment}>
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
                    Are you sure you want to delete this contact?
                  </Dialog.Title>

                  <div className="my-3">
                    <label
                      htmlFor="pass"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <div className="mt-1">
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        placeholder="Enter your password to verify"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={deleteDocument}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
