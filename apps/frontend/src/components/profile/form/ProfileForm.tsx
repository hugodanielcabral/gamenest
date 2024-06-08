import { Label } from "../../ui/label/Label";
import { Input } from "../../ui/input/Input";
import { Button } from "../../ui/button/Button";
import clsx from "clsx";
import { Option } from "../../ui/option/Option";
import {
  genderList,
  titleList,
} from "../../../constants/auth/constantsAuth.js";
import { DateTime } from "luxon";
import "./ProfileForm.css";
import { FormSelect } from "./select/FormSelect.js";
import { AuthErrors } from "../../auth/error/AuthErrors.js";

const EDIT_PROFILE = "Editar perfil";
const SAVE_PROFILE = "Guardar perfil";

export const ProfileForm = ({
  data,
  isLoading,
  editButton,
  user,
  country_id,
  gender,
  birthday,
  title,
  handleOnChange,
  handleOnSubmit,
  handleCancelEdit,
  errors,
}) => {
  return (
    <form onSubmit={handleOnSubmit} className="profile-form">
      <Label className={"mb-2 input input-bordered"}>
        Correo Electrónico:<span className="text-white">email@gmail.com</span>
      </Label>

      <FormSelect
        editMode={editButton === EDIT_PROFILE}
        labelText="Género"
        value={gender}
        name="gender"
        options={genderList}
        handleOnChange={handleOnChange}
      />

      {editButton === EDIT_PROFILE ? (
        <Label className={"mb-2 input input-bordered"}>
          País: <span className="text-white">{user?.country}</span>
        </Label>
      ) : (
        <select
          name="country_id"
          className={clsx(
            /*   {
                "border-2 border-error":
                  errors && errors.some((err) => err.path == "country_id"),
                "border-0":
                  errors && !errors.some((err) => err.path == "country_id"),
              }, */
            "mb-2 select select-bordered select-md"
          )}
          onChange={handleOnChange}
          value={country_id}
        >
          <option disabled value="">
            Seleccione un país
          </option>
          {!isLoading &&
            data?.map((country) => (
              <Option key={country.country_id} value={country.country_id}>
                {country.name}
              </Option>
            ))}
        </select>
      )}

      <Label
        className={clsx(
          {
            "border-error border-2":
              errors && errors.some((err) => err.path === "birthday"),
          },
          "mb-2 input input-bordered"
        )}
      >
        Fecha de nacimiento:
        {editButton === EDIT_PROFILE ? (
          <span className="text-white">
            {user.birthday
              ? DateTime.fromISO(user.birthday, { zone: "utc" }).toFormat(
                  "dd/MM/yyyy"
                )
              : "Fecha no establecida."}
          </span>
        ) : (
          <Input
            type="date"
            placeholder="Fecha de nacimiento"
            className="max-w-52 md:max-w-60 ml-auto"
            name="birthday"
            value={birthday ? DateTime.fromISO(birthday).toISODate() : ""}
            onChange={handleOnChange}
          />
        )}
      </Label>
      <AuthErrors errors={errors} inputField="birthday" />

      <FormSelect
        editMode={editButton === EDIT_PROFILE}
        labelText="Titulo"
        value={title}
        name="title"
        options={titleList}
        handleOnChange={handleOnChange}
      />

      {editButton === SAVE_PROFILE && (
        <div className="flex justify-center gap-x-5">
          <Button type="submit">Guardar</Button>
          <Button
            className="bg-error hover:bg-error hover:bg-opacity-70"
            onClick={handleCancelEdit}
          >
            Cancelar
          </Button>
        </div>
      )}
    </form>
  );
};
