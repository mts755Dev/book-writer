"use client";

import useHeaderHook from "./useHeader";

const Header = () => {
  const { state, logout, router } = useHeaderHook();
  return (
    <div className="bg-[#1A1C1B] flex items-center justify-between px-6">
      <h1 className="text-center p-4 text-2xl">Cloud Book Writer Platform</h1>
      <div className="flex gap-6">
        {state?.token && (
          <button onClick={() => router.push("/add-section")}>
            Add Section
          </button>
        )}
        {state?.user?.role === "author" && (
          <button onClick={() => router.push("/manage-access")}>
            Manage Access
          </button>
        )}
        {state.token && state?.token?.length > 0 ? (
          <button onClick={logout}>Log Out</button>
        ) : (
          <>
            <button onClick={() => router.push("/login")}>Log In</button>
            <button onClick={() => router.push("/register")}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
