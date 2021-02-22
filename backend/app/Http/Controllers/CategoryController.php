<?php

namespace App\Http\Controllers;

use App\Http\Requests\createCategoryRequest;
use App\Http\Requests\editCategoryRequest;
use App\Http\Requests\getCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function CategoryCreate(createCategoryRequest $request)
    {
        $Category = Category::create($request->all());
        return $Category;
    }

    public function editCategory(editCategoryRequest $request)
    {
        $Category = Category::where('id', $request->id)->first();
        $Category->update($request->all());
        return $Category;
    }

    public function deleteCategory(editCategoryRequest $request)
    {
        $Category = Category::where('id', $request->id)->first();
        $Category->delete();
        return $Category;
    }

    public function getCategory(getCategoryRequest $request)
    {
        $Category = Category::where('id', $request->id)->first();
        return $Category;
    }

    public function retrieveCategories()
    {
        $Categories= Category::all();
        return $Categories;
    }
}
