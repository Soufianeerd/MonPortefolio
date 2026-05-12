"use client";

import React, { useState, useMemo } from "react";
import data from "@/data/world_cup_starting_11s_1998_2026.json";
import { CardPremium } from "@/components/ui/CardPremium";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, User, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Player {
  position: string;
  firstname: string;
  lastname: string;
  club: string;
}

export default function EquipesPage() {
  const [selectedYear, setSelectedYear] = useState<string>("2022");
  const [selectedCountry, setSelectedCountry] = useState<string>("France");
  const [sorting, setSorting] = useState<SortingState>([]);

  // Derived data
  const years = useMemo(() => data.world_cup_editions.map((e) => e.year.toString()), []);
  
  const countries = useMemo(() => {
    const edition = data.world_cup_editions.find((e) => e.year.toString() === selectedYear);
    return edition ? edition.teams.map((t) => t.country) : [];
  }, [selectedYear]);

  const selectedTeam = useMemo(() => {
    const edition = data.world_cup_editions.find((e) => e.year.toString() === selectedYear);
    return edition ? edition.teams.find((t) => t.country === selectedCountry) : null;
  }, [selectedYear, selectedCountry]);

  // Table columns
  const columns: ColumnDef<Player>[] = [
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => {
        const pos = row.getValue("position") as string;
        const colors: Record<string, string> = {
          GK: "text-blue-600 bg-blue-50",
          DF: "text-green-600 bg-green-50",
          MF: "text-yellow-600 bg-yellow-50",
          FW: "text-red-600 bg-red-50",
        };
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${colors[pos] || "text-slate-500 bg-slate-50"}`}>
            {pos}
          </span>
        );
      },
    },
    {
      accessorKey: "firstname",
      header: "Prénom",
    },
    {
      accessorKey: "lastname",
      header: "Nom",
    },
    {
      accessorKey: "club",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-slate-100 p-0 font-bold"
          >
            Club
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: selectedTeam?.starting_11 || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-10 animate-in fade-in duration-700">
      {/* Header avec explication intuitive */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Équipes & Effectifs</h2>
          <p className="text-slate-500 font-medium">Découvrez les titulaires officiels et leurs clubs d&apos;origine.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
             <Select value={selectedYear} onValueChange={(val) => {
              if (!val) return;
              setSelectedYear(val);
              const edition = data.world_cup_editions.find((e) => e.year.toString() === val);
              if (edition && edition.teams.length > 0) {
                setSelectedCountry(edition.teams[0].country);
              }
            }}>
              <SelectTrigger className="w-[120px] border-none focus:ring-0 font-bold">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <Select value={selectedCountry} onValueChange={(val) => val && setSelectedCountry(val)}>
              <SelectTrigger className="w-[160px] border-none focus:ring-0 font-bold">
                <SelectValue placeholder="Pays" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Note intuitive */}
      <div className="bg-wc-red/5 border border-wc-red/10 p-4 rounded-xl flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-wc-red text-white flex items-center justify-center shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <p className="text-sm text-slate-600">
          <strong>Pourquoi cette page ?</strong> Cette vue vous permet de voir l&apos;ossature d&apos;une équipe. Vous pouvez trier par <strong>Club</strong> pour voir quelle équipe de club dominait la sélection.
        </p>
      </div>

      {selectedTeam && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <CardPremium className="lg:col-span-1" title="Encadrement" icon={Shield}>
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-slate-100">
                <h3 className="text-3xl font-black text-slate-900">{selectedTeam.country}</h3>
                <p className="text-wc-blue text-xs font-bold uppercase tracking-[2px] mt-1">Édition {selectedYear}</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Sélectionneur</p>
                  <p className="text-lg text-slate-900 font-bold">{selectedTeam.coach}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Capitaine</p>
                  <p className="text-lg text-slate-900 font-bold">{selectedTeam.captain}</p>
                </div>
              </div>
            </div>
          </CardPremium>

          <CardPremium title="Composition de Départ" subtitle="Onze titulaire" className="lg:col-span-3">
            <div className="rounded-xl border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent border-slate-100">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-slate-900 font-black text-[10px] uppercase tracking-widest h-12">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.map((row) => (
                    <TableRow key={row.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4 text-sm font-medium text-slate-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardPremium>
        </div>
      )}
    </div>
  );
}
