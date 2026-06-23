<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $department = $request->query('department', 'b-com');

        $data = Program::byDepartment($department)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn ($item) => [
                'id' => (string) $item->id,
                'level' => $item->level,
                'programName' => $item->program_name,
                'duration' => $item->duration,
                'intake' => $item->intake,
                'department' => $item->department,
            ]);

        return response()->json(['data' => $data]);
    }
}
