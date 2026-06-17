<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\BulkDestroysRecords;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDestroyRequest;
use App\Models\Program;
use App\Support\AdminPagination;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    use BulkDestroysRecords;

    public function index(Request $request)
    {
        $programs = AdminPagination::paginate(
            Program::query()->orderBy('sort_order')->orderBy('id'),
            $request,
            15,
        );
        $selectedPerPage = AdminPagination::selectedPerPage($request, 15);

        return view('admin.programs.index', compact('programs', 'selectedPerPage'));
    }

    public function create()
    {
        return view('admin.programs.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'level' => ['required', 'string', 'max:50'],
            'program_name' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:100'],
            'intake' => ['required', 'string', 'max:50'],
            'department' => ['required', 'in:b-com,bca'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        Program::create($validated);

        return redirect()->route('admin.programs.index')
            ->with('success', 'Program created successfully.');
    }

    public function edit(Program $program)
    {
        return view('admin.programs.edit', compact('program'));
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'level' => ['required', 'string', 'max:50'],
            'program_name' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:100'],
            'intake' => ['required', 'string', 'max:50'],
            'department' => ['required', 'in:b-com,bca'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $program->update($validated);

        return redirect()->route('admin.programs.index')
            ->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();

        return redirect()->route('admin.programs.index')
            ->with('success', 'Program deleted successfully.');
    }

    public function bulkDestroy(BulkDestroyRequest $request)
    {
        return $this->bulkDestroyRecords(
            $request,
            Program::class,
            'admin.programs.index',
            fn (Program $program) => $program->delete(),
        );
    }
}
