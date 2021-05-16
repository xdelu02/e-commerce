import React from "react";
import { AdminManagament } from "../../Tables/Tables";


export default function Admins() {
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <h4>Gestione utenti admin</h4>
        </div>
      </div>

      <AdminManagament />
    </>
  );
};