import React, { useState } from 'react';
import UploadComponent from './UploadComponent';
import QuestionComponent from './QuestionComponent';

function App() {
    const [documentId, setDocumentId] = useState(1);

    return (
        <div className="bg-white  text-black h-screen w-screen justify-center">
            <UploadComponent onUploadSuccess={setDocumentId} />
            <QuestionComponent documentId={documentId} />
        </div>
    );
}

export default App;
