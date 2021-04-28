<?php

namespace App\Http\Controllers\Api;

use App\Helpers\StringHelper;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Repositories\ChapterRepository;
use Illuminate\Support\Facades\File;
use Repositories\LevelRepository;
use Repositories\WordRepository;

class BackendController extends Controller {

    //
    public function __construct(ChapterRepository $chapterRepo,LevelRepository $levelRepo,WordRepository $wordRepo) {
        $this->levelRepo = $levelRepo;
        $this->chapterRepo = $chapterRepo;
        $this->wordRepo = $wordRepo;

    }
    public function search(Request $request) {
        if ($request->get('word')) {
            $word_ids = DB::table('word')->where('name','like', '%' . $request->get('word'). '%')->pluck('id')->toArray();
            $words = $this->wordRepo->all()->whereIn('id',$word_ids);
            return response()->json(['success'=>true,'words'=>$words]);
        }
        if ($request->get('chapter_id')) {
           $chapter = $this->chapterRepo->find($request->get('chapter_id'));
           $levels = $chapter ? $chapter->level : null;
           return response()->json(['success'=>true,'chapter'=>$chapter,'level'=>$levels]);
        }
        if ($request->get('level_id')) {
            $level = $this->levelRepo->find($request->get('level_id'));
            $words = $level->word;
            return response()->json(['success'=>true,'level'=>$level,'word'=>$words]);
        }
    return response()->json(['success'=>false]);
    }
    public function createChapter(Request $request) {
        $input = $request->all();
        $this->chapterRepo->create($input);
        return response()->json(['success'=>true]);
    }
}
