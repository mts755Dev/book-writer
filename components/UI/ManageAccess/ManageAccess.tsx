"use client";
import useManageAccess from "./useManageAccess";

const ManageAccess = () => {
  const {
    state,
    users,
    selectedCollaborator,
    permissionUpdated,
    permissions,
    updatePermissions,
    onChangeHandler,
    permissionCheckHandler,
  } = useManageAccess();

  return (
    <div className="flex flex-col gap-8 mt-36 items-center">
      {permissionUpdated && (
        <div className="w-[100%] h-10 p-2 bg-green-500 text-white">
          <span>Permissions Updated!</span>
        </div>
      )}
      {state?.user?.role === "author" && (
        <div className="flex gap-8 flex-col">
          <div className="flex flex-col">
            <span className="text-black text-xl">Collaborators</span>
            <select
              onChange={onChangeHandler}
              value={selectedCollaborator?.id}
              className="text-black w-[200px] h-10"
            >
              <option value="" selected>
                Select Collaborator...
              </option>
              {users.map((user: any) => (
                <option key={user?.email} value={user.id}>
                  {user?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-black text-xl">Permissions</span>
            <div className="flex gap-4 mt-2">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="add"
                  checked={permissions.includes("add")}
                  onChange={permissionCheckHandler}
                  className="w-[16px] h-[16px]"
                />
                <span className="text-black">Add Section</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="edit"
                  checked={permissions.includes("edit")}
                  onChange={permissionCheckHandler}
                  className="w-[16px] h-[16px]"
                />
                <span className="text-black">Edit Section</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="delete"
                  checked={permissions.includes("delete")}
                  onChange={permissionCheckHandler}
                  className="w-[16px] h-[16px]"
                />
                <span className="text-black">Delete Section</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={updatePermissions}
            className="p-2 bg-[#4179B8] h-10"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageAccess;
