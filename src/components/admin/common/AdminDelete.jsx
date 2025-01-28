import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

const AdminDelete = ({handleDelete}) => {
    return (
        <div>
            <button
                onClick={handleDelete}
                className=" text-red-500 py-1 rounded hover:text-red-800"
            >
                <MdDeleteForever className="text-2xl" />
            </button>
        </div>
    )
}

export default AdminDelete;
