"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Trash2,
  Eye,
  Search,
  X,
  Phone,
  Mail,
  IndianRupee,
  Calendar,
  Tag,
} from "lucide-react";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productInterest?: string;
  budget?: string;
  createdAt: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries?sort=-createdAt");
      const json = await res.json();
      if (json.success) setEnquiries(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (e) {
      alert("Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = enquiries.filter((e) =>
    `${e.name} ${e.email} ${e.phone} ${e.productInterest ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageSquare size={22} className="text-foreground" /> Enquiries
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {enquiries.length} total enquiries
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Name</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Contact</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Product Interest</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Budget</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-semibold">Date</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{enq.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <a href={`tel:${enq.phone}`} className="text-[#964B00] hover:underline flex items-center gap-1">
                          <Phone size={10} /> {enq.phone}
                        </a>
                        <a href={`mailto:${enq.email}`} className="text-[#964B00] hover:underline flex items-center gap-1">
                          <Mail size={10} /> {enq.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {enq.productInterest ? (
                        <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {enq.productInterest}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {enq.budget || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelected(enq)}
                          className="p-1.5 rounded-md hover:bg-white text-[#964B00] transition-colors"
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id)}
                          disabled={deleting === enq._id}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground text-lg">Enquiry Details</h3>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Name</p>
                  <p className="font-semibold text-foreground mt-1">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={10} /> Date
                  </p>
                  <p className="font-semibold text-foreground mt-1">
                    {new Date(selected.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Phone size={10} /> Phone
                  </p>
                  <a href={`tel:${selected.phone}`} className="font-semibold text-[#964B00] hover:underline mt-1 block">
                    {selected.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Mail size={10} /> Email
                  </p>
                  <a href={`mailto:${selected.email}`} className="font-semibold text-[#964B00] hover:underline mt-1 block truncate">
                    {selected.email}
                  </a>
                </div>
                {selected.productInterest && (
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Tag size={10} /> Product Interest
                    </p>
                    <p className="font-semibold text-foreground mt-1">{selected.productInterest}</p>
                  </div>
                )}
                {selected.budget && (
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-1">
                      <IndianRupee size={10} /> Budget
                    </p>
                    <p className="font-semibold text-foreground mt-1">{selected.budget}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Message</p>
                <p className="text-foreground text-sm bg-muted/40 rounded-lg p-3 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => handleDelete(selected._id)}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
