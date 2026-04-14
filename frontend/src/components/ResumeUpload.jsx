function ResumeUpload({ selectedFile, onFileSelect, isSubmitting }) {

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;

    if (!file) {
      onFileSelect(null);
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      onFileSelect(null);
      return;
    }

    onFileSelect(file);
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">Upload Resume</h3>
        <p className="text-sm text-slate-600">Choose a PDF file to continue.</p>
      </div>

      <input
        type="file"
        accept="application/pdf,.pdf"
        onChange={handleFileChange}
        className="block w-full cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
      />

      <p className="text-sm text-slate-700">
        Selected file: {selectedFile ? selectedFile.name : 'None'}
      </p>
    </section>
  );
}

export default ResumeUpload;
