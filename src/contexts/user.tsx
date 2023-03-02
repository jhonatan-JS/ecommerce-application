import React, { createContext, useState } from "react";

interface IUserProps {
  userId: String;
  setUserId: (data: string) => void;
}

interface IProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserProps>({} as IUserProps);

const TableProvider = ({ children }: IProps) => {
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default TableProvider;
