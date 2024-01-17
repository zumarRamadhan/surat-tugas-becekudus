// import { Icon } from "@iconify/react";omor_ide
import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/editsurattugas.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";
import Select from "react-select";
import ImgLogout from "../Assets/68582-log-out.gif";

function EditST() {
  const { id } = useParams();
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "master") {
      navigate("/ppk/db");
    }
  }, []);

  const showSuccessAdd = () => {
    const background = document.querySelector("#popup-success");
    background.style.display = "flex";
    const popupLogout = document.querySelector(".detail-success");
    popupLogout.style.display = "grid";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccess = () => {
    const background = document.querySelector("#popup-success");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-success");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
    setTimeout(() => navigate(`/db`), 300);
  };

  const showSuccessAddPegawai = () => {
    const background = document.querySelector("#popup-success-pegawai");
    background.style.display = "flex";
    const popupLogout = document.querySelector(".detail-success");
    popupLogout.style.display = "grid";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccessAddPegawai = () => {
    const background = document.querySelector("#popup-success-pegawai");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-success");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
  };

  const showRelog = () => {
    const background = document.querySelector("#Relog");
    background.style.display = "flex";
    const popUpRelog = document.querySelector(".detail-Relog");
    popUpRelog.style.display = "grid";
    popUpRelog.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeRelog = () => {
    const background = document.querySelector("#Relog");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpRelog = document.querySelector(".detail-Relog");
    setTimeout(() => (popUpRelog.style.display = "none"), 250);
    popUpRelog.style.animation = "slide-up 0.3s ease-in-out";
    navigate(`/login`);
  };

  const showFailed = () => {
    const background = document.querySelector("#popup-Failed");
    background.style.display = "flex";
    const popUpFailed = document.querySelector(".detail-Failed");
    popUpFailed.style.display = "grid";
    popUpFailed.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailed = () => {
    const background = document.querySelector("#popup-Failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpFailed = document.querySelector(".detail-Failed");
    setTimeout(() => (popUpFailed.style.display = "none"), 250);
    popUpFailed.style.animation = "slide-up 0.3s ease-in-out";
  };

  const showPopupLoading = () => {
    const background = document.querySelector(".popup-loading");
    background.style.display = "flex";
    const PopupLoading = document.querySelector(".body-loading");
    PopupLoading.style.display = "grid";
    PopupLoading.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closePopupLoading = () => {
    const background = document.querySelector(".popup-loading");
    setTimeout(() => (background.style.display = "none"), 300);
    const PopupLoading = document.querySelector(".body-loading");
    setTimeout(() => (PopupLoading.style.display = "none"), 250);
    PopupLoading.style.animation = "slide-up 0.3s ease-in-out";
  };

  const [formData, setFormData] = useState({
    id_pegawai: "",
    nomor_identitas: "",
    unit: "",
    no_ndpermohonan_st: "",
    no_st: "",
    nomor_st: "",
    tanggal_st: "",
    no_spd: "",
    tanggal_spd: "",
    tanggal_berangkat: "",
    tanggal_kembali: "",
    pencarian_dipa: "",
    dasar_pelaksanaan_tugas: "",
    maksud_perjalanan_dinas: "",
    kantor_tujuan_tugas: "",
    kota_asal_tugas: "",
    kota_tujuan_tugas_1: "",
    kota_tujuan_tugas_2: "",
    kota_tujuan_tugas_3: "",
    transportasi: "",
    id_ppk: "",
    tandatangan: "",
    plt: "",
    no_spyt: "",
    penanda_tangan: "",
    id_head_officer: "",
    tagging_status: "default",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingPegawai, setIsSubmittingPegawai] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //

  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [pegawaiOptions, setPegawaiOptions] = useState([]);
  const handlePegawaiChange = (selectedOption) => {
    setSelectedPegawai(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      id_pegawai: selectedOption?.value || "",
    }));
  };

  const [selectedPegawaiPPK, setSelectedPegawaiPPK] = useState(null);
  const [pegawaiPPKOptions, setPegawaiPPKOptions] = useState([]);
  const handlePegawaiPPKChange = (selectedOption) => {
    setSelectedPegawaiPPK(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      id_ppk: selectedOption?.value || "",
    }));
  };

  const [selectedPegawaiPenandaTangan, setSelectedPegawaiPenandaTangan] =
    useState(null);
  const [pegawaiPenandaTanganOptions, setPegawaiPenandaTanganOptions] =
    useState([]);
  const handlePegawaiPenandaTanganChange = (selectedOption) => {
    setSelectedPegawaiPenandaTangan(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      penanda_tangan: selectedOption?.value || "",
    }));
  };

  //
  useEffect(() => {
    showPopupLoading();
    axios
      .get(`${apiurl}assignment/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${saveToken}`,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((response) => {
        const selectedPegawaiOption = pegawaiOptions.find(
          (option) => option.value === response.data.data.id_pegawai
        );
        setSelectedPegawai(selectedPegawaiOption);

        const selectedPegawaiPPKOption = pegawaiPPKOptions.find(
          (option) => option.value === response.data.data.id_ppk
        );
        setSelectedPegawaiPPK(selectedPegawaiPPKOption);

        const selectedPegawaiPenandaTanganOption =
          pegawaiPenandaTanganOptions.find(
            (option) => option.value === response.data.data.id_head_officer
          );
        setSelectedPegawaiPenandaTangan(selectedPegawaiPenandaTanganOption);

        const selectedSubBagianSeksiOption = subBagianOptions.find(
          (option) => option.value === response.data.data.unit
        );
        setSelectedSubBagianSeksi(selectedSubBagianSeksiOption);

        const selectedTransportOption = TransportOptions.find(
          (option) => option.value === response.data.data.transportation
        );
        setSelectedTransport(selectedTransportOption);

        const selectedPembebananDIPAOption = pembebananDIPAOptions.find(
          (option) => option.value === response.data.data.dipa_search
        );
        setSelectedPembebananDIPA(selectedPembebananDIPAOption);

        setFormData({
          id_pegawai:
            response.data.data.id_pegawai !== "null"
              ? response.data.data.id_pegawai
              : "",
          nomor_identitas:
            response.data.data.nomor_identitas !== "null"
              ? response.data.data.nomor_identitas
              : "",
          unit:
            response.data.data.unit !== "null" ? response.data.data.unit : "",
          no_ndpermohonan_st:
            response.data.data.ndreq_st !== "null"
              ? response.data.data.ndreq_st
              : "",
          no_st:
            response.data.data.no_st !== "null" ? response.data.data.no_st : "",
          nomor_st:
            response.data.data.nomor_st !== "null"
              ? response.data.data.nomor_st
              : "",
          tanggal_st:
            response.data.data.date_st !== "null"
              ? response.data.data.date_st
              : "",
          no_spd:
            response.data.data.no_spd !== "null"
              ? response.data.data.no_spd
              : "",
          tanggal_spd:
            response.data.data.date_spd !== "null"
              ? response.data.data.date_spd
              : "",
          tanggal_berangkat:
            response.data.data.departure_date !== "null"
              ? response.data.data.departure_date
              : "",
          tanggal_kembali:
            response.data.data.return_date !== "null"
              ? response.data.data.return_date
              : "",
          pencarian_dipa:
            response.data.data.dipa_search !== "null"
              ? response.data.data.dipa_search
              : "",
          dasar_pelaksanaan_tugas:
            response.data.data.implementation_tasks !== "null"
              ? response.data.data.implementation_tasks
              : "",
          maksud_perjalanan_dinas:
            response.data.data.business_trip_reason !== "null"
              ? response.data.data.business_trip_reason
              : "",
          kantor_tujuan_tugas:
            response.data.data.destination_office !== "null"
              ? response.data.data.destination_office
              : "",
          kota_asal_tugas:
            response.data.data.city_origin !== "null"
              ? response.data.data.city_origin
              : "",
          kota_tujuan_tugas_1:
            response.data.data.destination_city_1 !== "null"
              ? response.data.data.destination_city_1
              : "",
          kota_tujuan_tugas_2:
            response.data.data.destination_city_2 !== "null"
              ? response.data.data.destination_city_2
              : "",
          kota_tujuan_tugas_3:
            response.data.data.destination_city_3 !== "null"
              ? response.data.data.destination_city_3
              : "",
          transportasi:
            response.data.data.transportation !== "null"
              ? response.data.data.transportation
              : "",
          id_ppk:
            response.data.data.id_ppk !== "null"
              ? response.data.data.id_ppk
              : "",
          tandatangan:
            response.data.data.signature !== "null"
              ? response.data.data.signature
              : "",
          plt: response.data.data.plt !== "null" ? response.data.data.plt : "",
          no_spyt:
            response.data.data.no_spyt !== "null"
              ? response.data.data.no_spyt
              : "",
          penanda_tangan:
            response.data.data.id_head_officer !== "null"
              ? response.data.data.id_head_officer
              : "",
          id_head_officer:
            response.data.data.id_head_officer !== "null"
              ? response.data.data.id_head_officer
              : "",
          tagging_status:
            response.data.data.tagging_status !== "null"
              ? response.data.data.tagging_status
              : "",
        });
        // closePopupLoading();
      })
      .catch((error) => {
        console.log("terjadi kesalahan: ", error);
        if (error.response && error.response.status === 401) {
          showRelog();
        } else {
          setIsLoading(false);
          showFailed();
        }
      });
  }, [
    id,
    saveToken,
    pegawaiOptions,
    pegawaiPPKOptions,
    pegawaiPenandaTanganOptions,
  ]);

  useEffect(() => {
    if (isSubmitting) {
      const form = new FormData();
      form.append("id_pegawai", formData.id_pegawai);
      form.append("nomor_identitas", formData.nomor_identitas);
      form.append("unit", formData.unit);
      form.append("no_ndpermohonan_st", formData.no_ndpermohonan_st);
      form.append("no_st", formData.no_st);
      form.append("nomor_st", formData.nomor_st);
      form.append("tanggal_st", formData.tanggal_st || "");
      form.append("no_spd", formData.no_spd);
      form.append("tanggal_spd", formData.tanggal_spd || "");
      form.append("tanggal_berangkat", formData.tanggal_berangkat || "");
      form.append("tanggal_kembali", formData.tanggal_kembali || "");
      form.append("pencarian_dipa", formData.pencarian_dipa);
      form.append("dasar_pelaksanaan_tugas", formData.dasar_pelaksanaan_tugas);
      form.append("maksud_perjalanan_dinas", formData.maksud_perjalanan_dinas);
      form.append("kantor_tujuan_tugas", formData.kantor_tujuan_tugas);
      form.append("kota_asal_tugas", formData.kota_asal_tugas);
      form.append("kota_tujuan_tugas_1", formData.kota_tujuan_tugas_1);
      form.append("kota_tujuan_tugas_2", formData.kota_tujuan_tugas_2);
      form.append("kota_tujuan_tugas_3", formData.kota_tujuan_tugas_3);
      form.append("transportasi", formData.transportasi);
      form.append("id_ppk", formData.id_ppk);
      form.append("tandatangan", formData.tandatangan);
      form.append("plt", formData.plt);
      form.append("no_spyt", formData.no_spyt);
      form.append("penanda_tangan", formData.penanda_tangan);
      form.append("tagging_status", formData.tagging_status);

      showPopupLoading();

      axios
        .post(`${apiurl}assignment/edit/${id}`, form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((result) => {
          const responseAPI = result.data;
          setIsLoading(false);
          setFormData({
            id_pegawai: "",
            nomor_identitas: "",
            unit: "",
            no_ndpermohonan_st: "",
            no_st: "",
            nomor_st: "",
            tanggal_st: "",
            no_spd: "",
            tanggal_spd: "",
            tanggal_berangkat: "",
            tanggal_kembali: "",
            pencarian_dipa: "",
            dasar_pelaksanaan_tugas: "",
            maksud_perjalanan_dinas: "",
            kantor_tujuan_tugas: "",
            kota_asal_tugas: "",
            kota_tujuan_tugas_1: "",
            kota_tujuan_tugas_2: "",
            kota_tujuan_tugas_3: "",
            transportasi: "",
            id_ppk: "",
            tandatangan: "",
            plt: "",
            no_spyt: "",
            penanda_tangan: "",
            tagging_status: "default",
          });
          setIsSubmitting(false);
          showSuccessAdd();
          closePopupLoading();
        })
        .catch((error) => {
          console.log("terjadi kesalahan: ", error);

          if (error.response && error.response.status === 401) {
            showRelog();
          } else {
            setIsLoading(false);
            showFailed();
            setIsSubmitting(false);
          }

          closePopupLoading();
        });
    }
  }, [isSubmitting, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.id_pegawai) errors.id_pegawai = "Nama harus diisi";
    if (!data.id_ppk) errors.id_ppk = "PPK harus diisi";
    if (!data.tagging_status) errors.tagging_status = "Silahkan pilih tagging";
    if (data.plt === "plh" && !data.penanda_tangan) {
      errors.penanda_tangan = "Penanda Tangan harus diisi";
    }
    if (!data.plt) errors.plt = "Wajib memilih role";
    if (!data.nomor_identitas)
      errors.nomor_identitas = "Nomor identitas harus diisi";
    return errors;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        showPopupLoading();
        // Panggil pertama
        const resultEmployee = await axios.get(`${apiurl}employee/data`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        });
        const responseEmployee = resultEmployee.data;
        const employeeOptions = responseEmployee.data.map((pegawai) => ({
          value: pegawai.id,
          label: pegawai.name,
        }));
        setPegawaiOptions(employeeOptions);

        // Panggil kedua
        const resultAssignmentPPK = await axios.get(`${apiurl}assignment/ppk`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        });
        const responseAssignmentPPK = resultAssignmentPPK.data;
        const ppkOptions = responseAssignmentPPK.data.map((pegawaiPPK) => ({
          value: pegawaiPPK.id,
          label: pegawaiPPK.name,
        }));
        setPegawaiPPKOptions(ppkOptions);

        // Panggil ketiga
        const resultPenandaTangan = await axios.get(`${apiurl}employee/data`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        });
        const responsePenandaTangan = resultPenandaTangan.data;
        const penandaTanganOptions = responsePenandaTangan.data.map(
          (penanda_tangan) => ({
            value: penanda_tangan.id,
            label: penanda_tangan.name,
          })
        );
        setPegawaiPenandaTanganOptions(penandaTanganOptions);

        setIsLoading(false);
        closePopupLoading();
      } catch (err) {
        console.log("terjadi kesalahan: ", err);

        if (err.response && err.response.status === 401) {
          showRelog();
          closePopupLoading();
        } else {
          setIsLoading(false);
          setErrors(true);
        }
      }
    };

    fetchData();
  }, []);

  const handleClearForm = () => {
    setFormData({
      id_pegawai: "",
      nomor_identitas: "",
      unit: "",
      no_ndpermohonan_st: "",
      no_st: "",
      nomor_st: "",
      tanggal_st: "",
      no_spd: "",
      tanggal_spd: "",
      tanggal_berangkat: "",
      tanggal_kembali: "",
      pencarian_dipa: "",
      dasar_pelaksanaan_tugas: "",
      maksud_perjalanan_dinas: "",
      kantor_tujuan_tugas: "",
      kota_asal_tugas: "",
      kota_tujuan_tugas_1: "",
      kota_tujuan_tugas_2: "",
      kota_tujuan_tugas_3: "",
      transportasi: "",
      id_ppk: "",
      tandatangan: "",
      plt: "kosong",
      no_spyt: "",
      penanda_tangan: "",
      tagging_status: "default",
    });

    setSelectedPegawai(null);
    setSelectedPegawaiPPK(null);
    setSelectedPegawaiPenandaTangan(null);

    setErrors({});
  };

  const handleAddPegawai = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmittingPegawai(true);

      const form = new FormData();
      form.append("id_pegawai", formData.id_pegawai);
      form.append("nomor_identitas", formData.nomor_identitas);
      form.append("unit", formData.unit);
      form.append("no_ndpermohonan_st", formData.no_ndpermohonan_st);
      form.append("no_st", formData.no_st);
      form.append("nomor_st", formData.nomor_st);
      form.append("tanggal_st", formData.tanggal_st || "");
      form.append("no_spd", formData.no_spd);
      form.append("tanggal_spd", formData.tanggal_spd || "");
      form.append("tanggal_berangkat", formData.tanggal_berangkat || "");
      form.append("tanggal_kembali", formData.tanggal_kembali || "");
      form.append("pencarian_dipa", formData.pencarian_dipa);
      form.append("dasar_pelaksanaan_tugas", formData.dasar_pelaksanaan_tugas);
      form.append("maksud_perjalanan_dinas", formData.maksud_perjalanan_dinas);
      form.append("kantor_tujuan_tugas", formData.kantor_tujuan_tugas);
      form.append("kota_asal_tugas", formData.kota_asal_tugas);
      form.append("kota_tujuan_tugas_1", formData.kota_tujuan_tugas_1);
      form.append("kota_tujuan_tugas_2", formData.kota_tujuan_tugas_2);
      form.append("kota_tujuan_tugas_3", formData.kota_tujuan_tugas_3);
      form.append("transportasi", formData.transportasi);
      form.append("id_ppk", formData.id_ppk);
      form.append("tandatangan", formData.tandatangan);
      form.append("tagging_status", formData.tagging_status);
      form.append("plt", formData.plt);
      form.append("no_spyt", formData.no_spyt);
      form.append("penanda_tangan", formData.penanda_tangan);

      showPopupLoading();

      axios
        .post(`${apiurl}assignment/create`, form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((result) => {
          const responseAPI = result.data;
          setIsLoading(false);
          setFormData((prevFormData) => ({
            ...prevFormData,
            id_pegawai: "",
            unit: "",
            no_ndpermohonan_st: "",
            no_spd: "",
            no_spyt: "",
          }));
          setIsSubmittingPegawai(false);
          setSelectedPegawai(null);
          closePopupLoading();
          showSuccessAddPegawai();
        })
        .catch((error) => {
          console.log("terjadi kesalahan: ", error);

          if (error.response && error.response.status === 401) {
            showRelog();
          } else {
            setIsLoading(false);
            showFailed();
          }

          closePopupLoading();
        });
    }
  };

  const subBagianOptions = [
    { value: "Subbagian Umum", label: "Subbagian Umum" },
    {
      value: "Seksi Intelijen dan Penindakan",
      label: "Seksi Intelijen dan Penindakan",
    },
    { value: "Seksi Penyidikan dan BHP", label: "Seksi Penyidikan dan BHP" },
    { value: "Seksi Perbendaharaan", label: "Seksi Perbendaharaan" },
    {
      value: "Seksi Pelayanan Kepabeanan dan Cukai I",
      label: "Seksi Pelayanan Kepabeanan dan Cukai I",
    },
    {
      value: "Seksi Pelayanan Kepabeanan dan Cukai II",
      label: "Seksi Pelayanan Kepabeanan dan Cukai II",
    },
    {
      value: "Seksi Penyuluhan dan Layanan Informasi",
      label: "Seksi Penyuluhan dan Layanan Informasi",
    },
    { value: "Seksi Kepatuhan Internal", label: "Seksi Kepatuhan Internal" },
  ];

  const [selectedSubBagianSeksi, setSelectedSubBagianSeksi] = useState([null]);
  const handleSubBagianSeksiChange = (selectedOption) => {
    setSelectedSubBagianSeksi(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      unit: selectedOption?.value || "",
    }));
  };

  const TransportOptions = [
    { value: "Kendaraan Dinas", label: "Kendaraan Dinas" },
    { value: "Kendaraan Pribadi", label: "Kendaraan Pribadi" },
    { value: "Transportasi Umum", label: "Transportasi Umum" },
  ];

  const [selectedTransport, setSelectedTransport] = useState(null);
  const handleTransport = (selectedOption) => {
    setSelectedTransport(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      transportasi: selectedOption?.value || "",
    }));
  };

  const pembebananDIPAOptions = [
    { value: "KPPBC TMC Kudus", label: "KPPBC TMC Kudus" },
    {
      value: "Kanwil DJBC Jateng dan DIY",
      label: "Kanwil DJBC Jateng dan DIY",
    },
    {
      value: "Sekretariat Direktorat Jenderal Bea dan Cukai",
      label: "Sekretariat Direktorat Jenderal Bea dan Cukai",
    },
    { value: "DBH CHT", label: "DBH CHT" },
    { value: "Lainnya", label: "Lainnya" },
  ];

  const [selectedPembebananDIPA, setSelectedPembebananDIPA] = useState(null);
  const handlePembebananDIPA = (selectedOption) => {
    setSelectedPembebananDIPA(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      pencarian_dipa: selectedOption?.value || "",
    }));
  };

  const showLogout = () => {
    const background = document.querySelector("#popup-logout");
    background.style.display = "flex";
    const popupLogout = document.querySelector(".detail-logout");
    popupLogout.style.display = "grid";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeLogout = () => {
    const background = document.querySelector("#popup-logout");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-logout");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div>
      <div
        className="logout"
        onClick={() => {
          showLogout();
        }}
      >
        <p>Keluar</p>
      </div>
      <header>
        <div className="logo">
          <img src={LogoAPKB} />
        </div>
        <ul className="navbar">
          <li className="active" onClick={() => navigate("/forminput")}>
            <a href="">INPUT</a>
          </li>
          <li onClick={() => navigate("/db")}>
            <a href="">DB</a>
          </li>
          <li onClick={() => navigate("/database")}>
            <a href="">DATABASE</a>
          </li>
          <li onClick={() => navigate("/print")}>
            <a href="">PRINT</a>
          </li>
          <li onClick={() => navigate("/dbpeg")}>
            <a href="">DBPEG</a>
          </li>
        </ul>
      </header>

      <div className="container">
        <div className="title-form">
          <h1>FORM EDIT</h1>
        </div>
        <div className="body-form">
          <div className="form-input">
            <p>Pegawai</p>
            <Select
              value={selectedPegawai}
              onChange={handlePegawaiChange}
              options={pegawaiOptions}
              isClearable
              placeholder="Pilih Pegawai"
              className="input-form"
              isDisabled={true}
            />
            {errors.id_pegawai && (
              <span className="error">{errors.id_pegawai}</span>
            )}
          </div>
          <div className="form-input">
            <p>Nomor Identitas</p>
            <input
              type="text"
              placeholder="Input Nomor Identitas"
              id="nomor_identitas"
              name="nomor_identitas"
              value={formData.nomor_identitas}
              onChange={handleChange}
            />
            {errors.nomor_identitas && (
              <span className="error">{errors.nomor_identitas}</span>
            )}
          </div>
          <div className="form-input">
            <p>Tanggal SPD</p>
            <input
              type="date"
              id="tanggal_spd"
              name="tanggal_spd"
              value={formData.tanggal_spd}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Sub Bagian/Seksi</p>
            <Select
              value={selectedSubBagianSeksi}
              onChange={handleSubBagianSeksiChange}
              options={subBagianOptions}
              isClearable
              placeholder="Pilih Sub Bagian/Seksi"
              className="input-form"
            />
          </div>
          <div className="form-input">
            <p>No SPYT</p>
            <input
              type="text"
              placeholder="Input No SPYT"
              id="no_spyt"
              name="no_spyt"
              value={formData.no_spyt}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>No ND Permohonan ST</p>
            <input
              type="text"
              placeholder="Input No ND Permohonan ST"
              id="no_ndpermohonan_st"
              name="no_ndpermohonan_st"
              value={formData.no_ndpermohonan_st}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Tanggal Berangkat</p>
            <input
              type="date"
              id="tanggal_berangkat"
              name="tanggal_berangkat"
              value={formData.tanggal_berangkat}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>No ST</p>
            <input
              type="text"
              placeholder="Input No ST"
              id="no_st"
              name="no_st"
              value={formData.no_st}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Tanggal Kembali</p>
            <input
              type="date"
              id="tanggal_kembali"
              name="tanggal_kembali"
              value={formData.tanggal_kembali}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Tanggal ST</p>
            <input
              type="date"
              id="tanggal_st"
              name="tanggal_st"
              value={formData.tanggal_st}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Pembebanan DIPA</p>
            <Select
              value={selectedPembebananDIPA}
              onChange={handlePembebananDIPA}
              options={pembebananDIPAOptions}
              isClearable
              placeholder="Pilih Pencairan DIPA"
              className="input-form"
            />
          </div>
          <div className="form-input">
            <p>No SPD</p>
            <input
              type="text"
              placeholder="Input No SPD"
              id="no_spd"
              name="no_spd"
              value={formData.no_spd}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Tagging</p>
            <div className="switch-inputTagging">
              <div className="con-radio">
                <label>
                  <input
                    type="radio"
                    name="tagging_status"
                    value="default"
                    checked={formData.tagging_status === "default"}
                    onChange={handleChange}
                  />
                  Default
                </label>
                <label>
                  <input
                    type="radio"
                    name="tagging_status"
                    value="canceled"
                    checked={formData.tagging_status === "canceled"}
                    onChange={handleChange}
                  />
                  Batal
                </label>
                <label>
                  <input
                    type="radio"
                    name="tagging_status"
                    value="online"
                    checked={formData.tagging_status === "online"}
                    onChange={handleChange}
                  />
                  Online
                </label>
              </div>
              {errors.tagging_status && (
                <span className="error">{errors.tagging_status}</span>
              )}
            </div>
          </div>
        </div>
        <div className="body-form">
          <div className="form-input">
            <p>Dasar Pelaksanaan Tugas</p>
            <input
              type="text"
              placeholder="Input Dasar Pelaksanaan Tugas"
              id="dasar_pelaksanaan_tugas"
              name="dasar_pelaksanaan_tugas"
              value={formData.dasar_pelaksanaan_tugas}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Kota Tujuan Tugas I</p>
            <input
              type="text"
              placeholder="Input Kota Tujuan Tugas I"
              id="kota_tujuan_tugas_1"
              name="kota_tujuan_tugas_1"
              value={formData.kota_tujuan_tugas_1}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Kota Tujuan Tugas II</p>
            <input
              type="text"
              placeholder="Input Kota Tujuan Tugas II"
              id="kota_tujuan_tugas_2"
              name="kota_tujuan_tugas_2"
              value={formData.kota_tujuan_tugas_2}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Kota Tujuan Tugas III</p>
            <input
              type="text"
              placeholder="Input Kota Tujuan Tugas III"
              id="kota_tujuan_tugas_3"
              name="kota_tujuan_tugas_3"
              value={formData.kota_tujuan_tugas_3}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Maksud Perjalanan Dinas</p>
            <input
              type="text"
              placeholder="Input Maksud Perjalanan Dinas"
              id="maksud_perjalanan_dinas"
              name="maksud_perjalanan_dinas"
              value={formData.maksud_perjalanan_dinas}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Kantor Tujuan Tugas</p>
            <input
              type="text"
              placeholder="Input Kantor Tujuan Tugas"
              id="kantor_tujuan_tugas"
              name="kantor_tujuan_tugas"
              value={formData.kantor_tujuan_tugas}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Kota Asal Tugas</p>
            <input
              type="text"
              placeholder="Input Kota Asal Tugas"
              id="kota_asal_tugas"
              name="kota_asal_tugas"
              value={formData.kota_asal_tugas}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <p>Transport</p>
            <Select
              value={selectedTransport}
              onChange={handleTransport}
              options={TransportOptions}
              isClearable
              placeholder="Pilih Transportasi"
              className="input-form"
            />
          </div>
          <div className="form-input">
            <p>Pegawai PKK (Dropdown)</p>
            <Select
              value={selectedPegawaiPPK}
              onChange={handlePegawaiPPKChange}
              options={pegawaiPPKOptions}
              isClearable
              placeholder="Pilih PPK"
              className="input-form"
            />
            {errors.id_ppk && <span className="error">{errors.id_ppk}</span>}
          </div>
          {formData.plt === "plh" && (
            <div
              className={`form-input ${
                formData.plt === "kosong" ? "hiddenPlh" : ""
              }`}
            >
              <p>Pejabat Penanda Tangan ST & SPD (Dropdown)</p>
              <Select
                value={selectedPegawaiPenandaTangan}
                onChange={handlePegawaiPenandaTanganChange}
                options={pegawaiPenandaTanganOptions}
                isClearable
                placeholder="Pilih Penanda Tangan"
                className="input-form"
              />
              {errors.penanda_tangan && (
                <span className="error">{errors.penanda_tangan}</span>
              )}
            </div>
          )}
          <div className="form-input">
            <p>Role</p>
            <div className="switch-inputRole">
              <div className="con-radio">
                <label>
                  <input
                    type="radio"
                    name="plt"
                    value="plh"
                    checked={formData.plt === "plh"}
                    onChange={handleChange}
                  />
                  PLH
                </label>
                <label>
                  <input
                    type="radio"
                    name="plt"
                    value="kosong"
                    checked={formData.plt === "kosong"}
                    onChange={handleChange}
                  />
                  NO PLH
                </label>
              </div>
              {errors.plt && <span className="error">{errors.plt}</span>}
            </div>
          </div>
          <div className="form-input">
            <div className="button-form">
              <button onClick={handleSubmit} id="save" type="submit">
                Simpan
              </button>
              <button id="clear" onClick={handleClearForm}>
                Clear Form
              </button>
              <button id="add" onClick={handleAddPegawai}>
                Tambah Pegawai
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="popup-success">
        <div className="detail-success">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeSuccess}
          />
          <div className="image-success">
            <img
              src={GifSuccess}
              alt="Delete Success"
              className="img-success"
            />
          </div>
          <p className="desc-success">Data berhasil dirubah!</p>
          <button className="btn-success" onClick={closeSuccess}>
            Kembali
          </button>
        </div>
      </div>

      <div id="popup-success-pegawai">
        <div className="detail-success">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeSuccess}
          />
          <div className="image-success">
            <img
              src={GifSuccess}
              alt="Delete Success"
              className="img-success"
            />
          </div>
          <p className="desc-success">
            Data berhasil ditambahkan! Silahkan tambah pegawai
          </p>
          <button className="btn-success" onClick={closeSuccessAddPegawai}>
            Kembali
          </button>
        </div>
      </div>

      <div id="popup-Failed">
        <div className="detail-Failed">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeFailed}
          />
          <div className="image-Failed">
            <img src={GifFailed} alt="Delete Failed" className="img-Failed" />
          </div>
          <p className="desc-Failed">Gagal menambahkan data!</p>
          <button className="btn-Failed" onClick={closeFailed}>
            Kembali
          </button>
        </div>
      </div>

      <div id="Relog">
        <div className="detail-Relog">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeRelog}
          />
          <div className="image-Relog">
            <img src={GifFailed} alt="Relog" className="img-Failed" />
          </div>
          <p className="desc-Relog">
            Akses Login Anda Sudah Expired, Silahkan Login Ulang!!
          </p>
          <button className="btn-Relog" onClick={closeRelog}>
            Login Ulang
          </button>
        </div>
      </div>

      {/*  */}

      <div className="popup-logout" id="popup-logout">
        <div className="detail-logout">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeLogout}
          />
          <div className="image-logout">
            <img src={ImgLogout} alt="" className="img-logout" />
          </div>
          <p className="desc-logout">Anda yakin ingin keluar?</p>
          <div className="con-btn-logout">
            <button
              type="button"
              className="btn-batal-logout"
              onClick={closeLogout}
            >
              Batal
            </button>
            <button type="button" className="btn-keluar" onClick={handleLogout}>
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* page laoding */}

      <div className="popup-loading">
        <div className="body-loading" id="body-loading">
          <svg
            class="pl"
            viewBox="0 0 200 200"
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
              <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                <stop offset="100%" stop-color="hsl(223,90%,55%)" />
              </linearGradient>
            </defs>
            <circle
              class="pl__ring"
              cx="100"
              cy="100"
              r="82"
              fill="none"
              stroke="url(#pl-grad1)"
              stroke-width="36"
              stroke-dasharray="0 257 1 257"
              stroke-dashoffset="0.01"
              stroke-linecap="round"
              transform="rotate(-90,100,100)"
            />
            <line
              class="pl__ball"
              stroke="url(#pl-grad2)"
              x1="100"
              y1="18"
              x2="100.01"
              y2="182"
              stroke-width="36"
              stroke-dasharray="1 165"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      {/* end page loading */}
    </div>
  );
}

export default EditST;
