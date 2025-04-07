document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('infoForm');
    const dataStore = [];

    function getValue(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            userId: getValue('userId'),
            fullName: getValue('fullName'),
            nationalId: getValue('nationalId'),
            birthday: getValue('birthday'),
            gender: getValue('gender'),
            religion: getValue('religion'),
            occupation: getValue('occupation'),
            qualification: getValue('qualification'),
            graduation: getValue('graduationYear'),
            maritalStatus: getValue('maritalStatus'),
            marriageDate: getValue('marriageDate'),
            occupationBeforeMarriage: getValue('occupationBeforeMarriage'),
            residence: getValue('residence'),
            address: getValue('address'),
            center: getValue('center'),
            city: getValue('city'),
            telephone: getValue('telephone'),
            mobile: getValue('mobile'),
            disability: getValue('disability'),
            illness: getValue('illness'),
            health: getValue('health')
        };

        const duplicate = dataStore.find(d =>
            (d.userId === formData.userId && d.fullName.toLowerCase() === formData.fullName.toLowerCase()) ||
            d.nationalId === formData.nationalId
        );

        if (duplicate) {
            alert("Duplicate entry detected!");
            return;
        }

        dataStore.push(formData);
        alert("Data saved!");
        form.reset();
        checkDuplicateLive();
    });

    const nameInput = document.getElementById('fullName');
    const nationalIdInput = document.getElementById('nationalId');
    const warning = document.getElementById('duplicateWarning');
    const submitBtn = form.querySelector('button[type="submit"]');

    function checkDuplicateLive() {
        const nameVal = getValue('fullName').toLowerCase();
        const idVal = getValue('nationalId');
        const userIdVal = getValue('userId');

        const isDuplicate = dataStore.some(d =>
            (d.userId === userIdVal && d.fullName.toLowerCase() === nameVal) ||
            d.nationalId === idVal
        );

        if (isDuplicate) {
            if (warning) warning.style.display = 'inline';
            if (submitBtn) submitBtn.disabled = true;
        } else {
            if (warning) warning.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    }

    if (nameInput) nameInput.addEventListener('input', checkDuplicateLive);
    if (nationalIdInput) nationalIdInput.addEventListener('input', checkDuplicateLive);

    window.downloadCSV = function () {
        if (dataStore.length === 0) {
            alert("No data to download.");
            return;
        }
        const headers = Object.keys(dataStore[0]).join(",");
        const rows = dataStore.map(obj =>
            Object.values(obj).map(v => `"${v}"`).join(",")
        );
        const csvContent = [headers, ...rows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "personal_info.csv";
        link.click();
    };
});
