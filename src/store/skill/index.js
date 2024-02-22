import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndpoints } from "../../services/apis";
import { baseAxios } from "../../services";
import { convertQueryString } from "../../utils/utility";
import { notify } from "../../utils/custom/Notification";
import { skillModel } from "./model";

import { HttpStatusCode } from "axios";
const types = {
  GET_SKILL_DROPDOWN: "GET_SKILL_DROPDOWN",
  GET_ALL_SKILLS_BY_QUERY: "GET_ALL_SKILLS_BY_QUERY",
  GET_SKILL_BY_ID: "GET_SKILL_BY_ID",
  ADD_SKILL: "ADD_SKILL",
  UPDATE_SKILL: "UPDATE_SKILL",
  DELETE_SKILL: "DELETE_SKILL",
};

//Get List Data by Query
export const getSkills = createAsyncThunk(
  types.GET_ALL_SKILLS_BY_QUERY,
  async (data) => {
    const { queryParams, queryObj } = data;
    // console.log("filter", filter);
    const apiEndpoint = `${apiEndpoints.skill}?${convertQueryString(
      queryParams,
    )}`;

    const response = await baseAxios.post(apiEndpoint, queryObj);
    return {
      ...response.data,
      queryParams,
      queryObj,
    };
  },
);

export const bindSkillDropdown = createAsyncThunk(
  types.GET_SKILL_DROPDOWN,
  async () => {
    const apiEndPoint = apiEndpoints.skill;
    const res = await baseAxios.get(apiEndPoint);
    const dropdown = res.data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return dropdown;
  },
);

export const addSkill = createAsyncThunk(types.ADD_SKILL, async (data) => {
  const apiEndPoint = `${apiEndpoints.skill}/new`;

  try {
    const response = await baseAxios.post(apiEndPoint, data);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch ({ response }) {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
});
export const updateSkill = createAsyncThunk(
  types.UPDATE_SKILL,
  async (data) => {
    const apiEndPoint = `${apiEndpoints.skill}/${data.id}`;
    try {
      const response = await baseAxios.put(apiEndPoint, data);

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch ({ response }) {
      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
    }
  },
);
export const deleteSkill = createAsyncThunk(types.DELETE_SKILL, async (id) => {
  const apiEndPoint = `${apiEndpoints.skill}/${id}`;
  try {
    const response = await baseAxios.delete(apiEndPoint);

    return {
      data: response?.data,
      status: response?.status,
      statusText: response?.statusText,
    };
  } catch ({ response }) {
    return {
      data: response?.data,
      status: response?.status,
      statusText: response?.statusText,
    };
  }
});

export const getSkill = createAsyncThunk(types.GET_SKILL_BY_ID, async (id) => {
  const apiEndPoint = `${apiEndpoints.skill}/${id}`;
  const res = await baseAxios.get(apiEndPoint);
  const data = res.data.data;

  const dt = {
    ...data,
  };
  return dt;
});

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    skill: skillModel,
    total: 1,
    queryParams: {},
    queryObj: {},
    loading: false,
    skillDropdown: [],
    isSkillDropdownLoaded: true,
    skillSidebarOpen: false,
  },
  reducers: {
    bindSkillSidebar: (state, action) => {
      state.skillSidebarOpen = action.payload;
    },
    bindSkill: (state, action) => {
      state.skill = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state, action) => {
        state.skills = [];
        state.total = 0;
        state.loading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        const { totalRecords, data, queryParams, queryObj } = action.payload;
        state.skills = data;
        state.total = totalRecords;
        state.loading = false;
        state.queryParams = queryParams;
        state.queryObj = queryObj;
      })
      .addCase(getSkill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSkill.fulfilled, (state, action) => {
        state.skill = action.payload;
        state.skillSidebarOpen = true;
        state.loading = false;
      })
      .addCase(bindSkillDropdown.pending, (state, action) => {
        state.skillDropdown = [];
        state.isSkillDropdownLoaded = false;
      })
      .addCase(bindSkillDropdown.fulfilled, (state, action) => {
        state.skillDropdown = action.payload;
        state.isSkillDropdownLoaded = true;
      })
      .addCase(addSkill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;
        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.skillSidebarOpen = false;
          state.skill = skillModel;
          notify("success", "The Skill has been created successfully");
        } else {
          notify("error", `${data.error}`);
        }
      })
      .addCase(addSkill.rejected, (state) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      })
      .addCase(updateSkill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const { status, data, statusText } = action.payload;

        state.loading = false;

        if (status === HttpStatusCode.Created) {
          state.skillSidebarOpen = false;
          state.skill = skillModel;
          notify("success", "The Skill has been updated successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      })
      .addCase(deleteSkill.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        console.log(action);
        state.loading = false;

        if (status === HttpStatusCode.Ok) {
          notify("success", "The Skill has been deleted successfully");
        } else {
          notify("error", `${data?.error}`);
        }
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        notify("error", "The operation was rejected!");
      });
  },
});
export const { bindSkillSidebar, bindSkill } = skillSlice.actions;
export default skillSlice.reducer;
