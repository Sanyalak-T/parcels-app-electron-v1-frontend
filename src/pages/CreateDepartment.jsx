import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";
import { createDepartment } from "../services/departmentService";

const CreateDepartment = ({
  onDepartmentAdded,
}) => {
  const [departmentName, setDepartmentName] =
    useState("");
  const [departmentRemark, setDepartmentRemark] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newDepartment =
        await createDepartment({
          departmentName,
          departmentRemark,
        });
      setDepartmentName("");
      setDepartmentRemark("");
      if (onDepartmentAdded)
        onOrganizationAdded(newDepartment);
      navigate("/department");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Create a department failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* Secondary Navbar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-medium">
            <p>Creating New Department</p>
          </div>
          <Link
            to="/department"
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Department List
          </Link>
        </div>
      </nav>

      <div className="flex flex-row justify-center">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleCreateDepartment}
          className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Department Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="departmentName"
                className="block text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                id="departmentName"
                value={departmentName}
                onChange={(e) =>
                  setDepartmentName(
                    e.target.value
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="departmentRemark"
                className="block text-sm font-medium text-gray-700"
              >
                Department Remark
              </label>
              <input
                type="text"
                name="departmentRemark"
                id="departmentRemark"
                value={departmentRemark}
                onChange={(e) =>
                  setDepartmentRemark(
                    e.target.value
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Optional notes"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {/* {loading ? "Saving..." : "Save"} */}
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDepartment;
