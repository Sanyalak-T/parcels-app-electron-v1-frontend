import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";
import { createParcel } from "../services/parcelService";

const CreateParcel = ({ onParcelOnAdded }) => {
  const [arrivalDate, setArrivalDate] =
    useState("");
  const [numberOrCode, setNumberOrCode] =
    useState("");
  const [parcelType, setParcelType] =
    useState("");
  const [parcelName, setParcelName] =
    useState("");
  const [
    brandTypeModelSizeDescrip,
    setBrandTypeModelSizeDescrip,
  ] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [howToGet, setHowToGet] = useState("");
  const [parcelRemark, setParcelRemark] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateParcel = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newParcel = await createParcel({
        arrivalDate,
        numberOrCode,
        parcelType,
        parcelName,
        brandTypeModelSizeDescrip,
        unitPrice,
        howToGet,
        parcelRemark,
      });
      setArrivalDate("");
      setNumberOrCode("");
      setParcelType("");
      setParcelName("");
      setBrandTypeModelSizeDescrip("");
      setUnitPrice("");
      setHowToGet("");
      setParcelRemark("");
      if (onParcelOnAdded)
        onParcelOnAdded(newParcel);
      navigate("/parcel");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Create a parcel failed. Please try again."
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
            <p>Creating New Percel</p>
          </div>
          <Link
            to="/parcel"
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Percel List
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
          onSubmit={handleCreateParcel}
          className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Parcel Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="arrivalDate"
                className="block text-sm font-medium text-gray-700"
              >
                Arrival Date
              </label>
              <input
                type="date"
                name="arrivalDate"
                id="arrivalDate"
                value={arrivalDate}
                onChange={(e) =>
                  setArrivalDate(e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="numberOrCode"
                className="block text-sm font-medium text-gray-700"
              >
                Number or Code
              </label>
              <input
                type="text"
                name="numberOrCode"
                id="numberOrCode"
                value={numberOrCode}
                onChange={(e) =>
                  setNumberOrCode(e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., A-001"
              />
            </div>

            <div>
              <label
                htmlFor="parcelType"
                className="block text-sm font-medium text-gray-700"
              >
                Parcel Type
              </label>
              <select
                type="select"
                name="parcelType"
                id="parcelType"
                value={parcelType}
                onChange={(e) =>
                  setParcelType(e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Material type"
              >
                <option value="">
                  --Select Type--
                </option>
                <option value="material type">
                  Material Type
                </option>
                <option value="equipment type">
                  Equipment Type
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="parcelName"
                className="block text-sm font-medium text-gray-700"
              >
                Parcel Name
              </label>
              <input
                type="text"
                name="parcelName"
                id="parcelName"
                value={parcelName}
                onChange={(e) =>
                  setParcelName(e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Computer Name"
              />
            </div>

            <div>
              <label
                htmlFor="brandTypeModelSizeDescrip"
                className="block text-sm font-medium text-gray-700"
              >
                Brand, Tpye...
              </label>
              <input
                type="text"
                name="brandTypeModelSizeDescrip"
                id="brandTypeModelSizeDescrip"
                value={brandTypeModelSizeDescrip}
                onChange={(e) =>
                  setBrandTypeModelSizeDescrip(
                    e.target.value
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Lenovo"
              />
            </div>

            <div>
              <label
                htmlFor="unitPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Unit Price (฿)
              </label>
              <input
                type="text"
                name="unitPrice"
                id="unitPrice"
                value={unitPrice}
                onChange={(e) =>
                  setUnitPrice(e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 15000"
              />
            </div>

            <div>
              <label
                htmlFor="howToGet"
                className="block text-sm font-medium text-gray-700"
              >
                How to Get
              </label>
              <input
                type="text"
                name="howToGet"
                id="howToGet"
                value={howToGet}
                onChange={(e) =>
                  setHowToGet(e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Money Support 2024"
              />
            </div>

            <div>
              <label
                htmlFor="parcelRemark"
                className="block text-sm font-medium text-gray-700"
              >
                Remark
              </label>
              <input
                type="text"
                name="parcelRemark"
                id="parcelRemark"
                value={parcelRemark}
                onChange={(e) =>
                  setParcelRemark(e.target.value)
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
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateParcel;
