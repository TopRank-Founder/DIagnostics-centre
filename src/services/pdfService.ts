import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface HealthPackage {
  title: string;
  price?: string;
  description: string;
  tests: string[];
}

export const generateHealthPackagesPDF = (packages: HealthPackage[]) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // Header
  doc.setFillColor(32, 33, 36); // #202124 (Google Dark Grey)
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Agilus Diagnostics Mohali", 15, 18);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Master Directory: Premier Health Packages 2026", 15, 28);
  doc.text(`Generated on: ${timestamp}`, 150, 28);

  let yOffset = 50;

  packages.forEach((pkg, index) => {
    if (yOffset > 250) {
      doc.addPage();
      yOffset = 20;
    }

    // Package Title
    doc.setTextColor(66, 133, 244); // #4285F4 (Google Blue)
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${pkg.title}`, 15, yOffset);
    yOffset += 8;

    // Price/Date info if exists
    if (pkg.price) {
      doc.setTextColor(52, 168, 83); // #34A853 (Agilus Green)
      doc.setFontSize(10);
      doc.text(pkg.price, 15, yOffset);
      yOffset += 6;
    }

    // Description
    doc.setTextColor(60, 64, 67); // #3C4043
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const splitDesc = doc.splitTextToSize(pkg.description, 180);
    doc.text(splitDesc, 15, yOffset);
    yOffset += splitDesc.length * 6 + 4;

    // Test List (Table style)
    if (pkg.tests && pkg.tests.length > 0) {
      autoTable(doc, {
        startY: yOffset,
        head: [['Included Diagnostic Tests']],
        body: pkg.tests.map(test => [test]),
        theme: 'striped',
        headStyles: { fillColor: [66, 133, 244] },
        styles: { fontSize: 9 },
        margin: { left: 15, right: 15 },
      });
      yOffset = (doc as any).lastAutoTable.finalY + 15;
    } else {
      yOffset += 5;
    }
  });

  // Footer on all pages
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Agilus Diagnostics Mohali - Booth No. 12, Gmada Market, Sector 69. Ph: 091154 59115",
      15,
      285
    );
    doc.text(`Page ${i} of ${pageCount}`, 180, 285);
  }

  doc.save("Agilus_Mohali_Health_Packages.pdf");
};
