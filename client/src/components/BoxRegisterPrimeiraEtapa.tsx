import { Button, TextField } from "@mui/material";
import React from "react";
import "../styles/BoxLoginStyles.css";
import { ThemeProvider } from "@material-ui/system";
import ButtonStyles from "../styles/ButtonStyles";
import { useFormik } from "formik";
import InputField from "../styles/BoxInput";
import BoxInputPadrao from "./BoxInputPadrao";
import HeaderLoginRegister from "./HeaderLoginRegister";
import * as yup from "yup";

export interface Props {
  next: (newData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cpfCnpj: string;
    cell: string;
    userType: string;
  }) => void;
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cpfCnpj: string;
    cell: string;
    userType: string;
  };
}

export const BoxRegisterPrimeiraEtapa: React.FC<Props> = ({ next, data }) => {
  const validationSchema = yup.object({
    name: yup.string().required("Campo obrigatorio"),
    email: yup.string().email("Email invalido").required("Campo obrigatorio"),
    password: yup
      .string()
      .required("Campo obrigatorio")
      .min(8, "Senha muito curta"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas nao sao iguais"),
  });

  const formik = useFormik({
    initialValues: data,

    onSubmit: (values) => {
      console.log("primeira etapa", values);
      next(values);
    },

    validationSchema: validationSchema,
  });

  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <div className="boxlogin">
        <form onSubmit={formik.handleSubmit}>
          <HeaderLoginRegister
            title={"Crie uma de graça"}
            subtitle={"Não possui uma conta?"}
            local={"register"}
          />
          <BoxInputPadrao
            tipo="text"
            placeHolder="Nome completo"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <BoxInputPadrao
            tipo="text"
            placeHolder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <BoxInputPadrao
            tipo="text"
            placeHolder="Senha"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <BoxInputPadrao
            tipo="text"
            placeHolder="Confirme sua senha"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            type="submit"
            sx={{
              borderRadius: "30px",
              // background: "#6750A4",
              width: "100%",
              paddingBottom: "10px",
              height: "43px",
            }}
            color="secondary"
            variant="contained"
          >
            Continuar
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default BoxRegisterPrimeiraEtapa;
