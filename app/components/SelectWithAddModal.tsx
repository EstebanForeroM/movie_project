import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface SelectWithAddModalProps {
  label: string;
  items: { id: number; name: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  onAddNew: (newItemName: string) => Promise<void>;
}

const SelectWithAddModal: React.FC<SelectWithAddModalProps> = ({
  label,
  items,
  selectedValue,
  onChange,
  onAddNew,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__add_new__') {
      setShowAddModal(true);
    } else {
      onChange(e.target.value);
    }
  };

  const handleAddNew = async () => {
    try {
      await onAddNew(newItemName);
      setShowAddModal(false);
      setNewItemName('');
    } catch (error) {
      console.error(`Failed to add new ${label.toLowerCase()}`, error);
    }
  };

  return (
    <div className="block">
      <label className="text-gray-900 dark:text-white font-semibold">{label}:</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {items.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
        <option value="__add_new__">Add new {label}</option>
      </select>

      {/* Modal for adding new item */}
      <Transition appear show={showAddModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowAddModal(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <DialogPanel className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
                <DialogTitle className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Add New {label}
                </DialogTitle>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 mb-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder={`${label} Name`}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md mr-2 hover:bg-purple-700"
                  >
                    Add {label}
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SelectWithAddModal;
