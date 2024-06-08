import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";
import toast from "../utils/toast.js";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const EDIT_PROFILE = "Editar perfil";
const SAVE_PROFILE = "Guardar perfil";

export const useProfile = () => {
  const { user, updateProfile, getProfileStats, errors, setErrors } = useAuth();
  const { data, isLoading } = useFetch(`${BASE_URL}/country`);
  const { formData, handleOnChange, setFormData } = useForm({
    country_id: user.country_id,
    gender: user.gender,
    birthday: user.birthday,
    title: user.title,
    avatar: user.avatar,
  });
  const [editButton, setEditButton] = useState(EDIT_PROFILE);
  const [selectedAvatar, setSelectedAvatar] = useState<String>(
    user.avatar || ""
  );


  const toggleEditState = () => {
    setEditButton((prevState) =>
      prevState === EDIT_PROFILE ? SAVE_PROFILE : EDIT_PROFILE
    );
    
  };

  const handleCancelEdit = () => {
    setEditButton(EDIT_PROFILE);
    setFormData({
      gender: user.gender,
      country_id: user.country_id,
      birthday: user.birthday,
      title: user.title,
      avatar: user.avatar,
    });
    setSelectedAvatar(user.avatar);
    setErrors(null);
  };

  const handleOnSubmit = async (e:Event) => {
    e.preventDefault();
    try {
      const response = await updateProfile(formData, user.username);
      if (response) {
        setEditButton(EDIT_PROFILE);
        setErrors(null);
        toast(
          `Perfil actualizado correctamente`,
          "success",
          "#fff",
          "#00A7EA",
          "top-right"
        );
      }
    } catch (error) {
      toast(
        `Error al actualizar el perfil`,
        "error",
        "#fff",
        "#00A7EA",
        "top-right"
      );
    }
  };

  return {
    user,
    formData,
    handleOnChange,
    handleOnSubmit,
    handleCancelEdit,
    editButton,
    toggleEditState,
    isLoading,
    data,
    setFormData,
    getProfileStats,
    selectedAvatar,
    setSelectedAvatar,
    errors
  };
};
