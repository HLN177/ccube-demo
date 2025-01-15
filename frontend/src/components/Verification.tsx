import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAuthModel } from '@/models/auth.models';
import type { AuthType, CreateCheckType } from '@/models/auth.models';
import service from '@/api/service';

function VerificationPage() {
  const clientIdRef = useRef<string | null>(null);
  const complycubeRef = useRef<any>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.complycube.com/web-sdk/v1/complycube.min.js";
    script.async = true;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "https://assets.complycube.com/web-sdk/v1/style.css";
    document.head.appendChild(script);
    document.head.appendChild(style);
    return () => {
      if (complycubeRef.current) {
        complycubeRef.current.unmount?.();
      }
      document.head.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<AuthType>({
    resolver: zodResolver(createAuthModel()),
    defaultValues: {
      email: "",
      personDetails: {
        firstName: "",
        lastName: "",
        dob: "",
      }
    },
  });

  const resetAll = () => {
    reset();
    setStatus(null);
    setCheckResult(null);
    setIsChecking(false);
  };

  const handleOnCompete = async (result: any) => {
    console.log("Verification complete:", result);
    const {
      documentCapture: { documentId = '' } = {},
      faceCapture: { livePhotoId = '' } = {}
    } = result;

    try {
      const clientId = clientIdRef.current;
      if (!clientId) {
        throw new Error("Client ID is missing.");
      }
      const dcData: CreateCheckType = {
        type: 'document_check',
        clientId,
        documentId
      };
  
      const icData: CreateCheckType = {
        type: 'identity_check',
        clientId,
        documentId,
        livePhotoId
      };
  
      const [dcResult, icResult] = await Promise.all([
        service.createCheck(dcData),
        service.createCheck(icData)
      ]);

      console.log("Check results:", { dcResult, icResult });

      const { id: dcCheckId } = dcResult;
      const { id: icCheckId } = icResult;
  
      setIsChecking(true);
      checkStatus(dcCheckId, icCheckId);
    } catch (error) {
      console.error("Error during check:", error);
    } finally {
      handleModalClose();
    }
  }

  const checkStatus = (dcCheckId: string, icCheckId: string) => {
    const interval = setInterval(async () => {
      try {
        const [dcCheckResult, icCheckResult] = await Promise.all([
          service.getCheck(dcCheckId),
          service.getCheck(icCheckId),
        ]);

        console.log("Polling results:", { dcCheckResult, icCheckResult });

        const isComplete =
          dcCheckResult.status === "complete" &&
          icCheckResult.status === "complete";

        if (isComplete) {
          clearInterval(interval);
          setIsChecking(false);
          setStatus("complete");
          setCheckResult({ dcCheckResult, icCheckResult });
        }
      } catch (error) {
        console.error("Error during polling:", error);
        clearInterval(interval);
        setIsChecking(false);
        setStatus("error");
      }
    }, 5000);
  };

  const handleModalClose = () => {
    if (complycubeRef.current) {
      complycubeRef.current.unmount?.();
      complycubeRef.current = '';
    }
  }

  const onSubmit = async (event: AuthType) => {
    try {
      const tokenInfo = await service.createToken(event);
      clientIdRef.current = tokenInfo.clientId;
      complycubeRef.current = window.ComplyCube.mount({
        token: tokenInfo.token,
        containerId: 'complycube-mount',
        onComplete: handleOnCompete,
        onModalClose: handleModalClose,
        onError: (error) => {
          console.error("Verification error:", error);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {t('name.title')}
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              status === null ? handleSubmit(onSubmit)(e) : resetAll();
            }}
            noValidate
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box mb={2} sx={{ '& .MuiTextField-root': { m: 1 } }}>
              <TextField
                required
                fullWidth
                id="email"
                label={t('name.email')}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                {...register('email')}
              />
              <TextField
                required
                fullWidth
                id="personDetails.firstName"
                label={t('name.first_name')}
                error={!!errors?.personDetails?.firstName}
                helperText={errors?.personDetails?.firstName ? errors.personDetails.firstName.message : null}
                {...register('personDetails.firstName')}
              />
              <TextField
                required
                fullWidth
                id="personDetails.lastName"
                label={t('name.last_name')}
                error={!!errors?.personDetails?.lastName}
                helperText={errors?.personDetails?.lastName ? errors.personDetails.lastName.message : null}
                {...register('personDetails.lastName')}
              />
              <DateField
                {...register('personDetails.dob')}
                onChange={(newValue) => {
                  setValue("personDetails.dob", newValue?.format("YYYY-MM-DD") || "");
                }}
                required
                label={t("name.date_of_birth")}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: {
                    error: !!errors?.personDetails?.dob,
                    helperText: errors.personDetails?.dob?.message,
                  },
                }}
                fullWidth
              />
            </Box>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={isChecking}
                >
                  {status === null ? t("name.upload") : t("name.try_again")}
                </Button>
            </Stack>
          </Box>
          {/* Status Indicator */}
          {isChecking && (
            <Box mt={4} textAlign="center">
              <CircularProgress />
              <Typography variant="body1">{t("message.checking")}</Typography>
            </Box>
          )}
          {status === "complete" && checkResult && (
            <Alert severity="success" sx={{ mt: 4 }}>
              {t("message.check_success")}
            </Alert>
          )}
          {status === "error" && (
            <Alert severity="error" sx={{ mt: 4 }}>
              {t("message.error_occurr")}
            </Alert>
          )}
        </Container>
        <div id="complycube-mount" style={{zIndex: 4}}></div>
      </LocalizationProvider>
    </>
  )
}

export default VerificationPage