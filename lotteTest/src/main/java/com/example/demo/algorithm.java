package com.example.demo;

import java.util.ArrayList;
import java.util.List;

public class algorithm {
	public static void makePlist(List<Integer> plist, ArrayList<ArrayList<Integer>> ptlist, int[] task) {
		plist.clear();
		plist.add(0);
		plist.add(task[1]);
		
		ptlist.clear();
		ArrayList<Integer> tmp1 = new ArrayList<Integer>();
		ptlist.add(tmp1);
		ArrayList<Integer> tmp2 = new ArrayList<Integer>();
		tmp2.add(1);
		ptlist.add(tmp2);
		
		for(int i = 2;i<task.length;i++) {
			ArrayList<Integer> tmp3 = new ArrayList<Integer>();
			ptlist.add(tmp3);
			plist.add(p(i, plist, ptlist, task));
		}
	
	}
	
	public static int p(int n, List<Integer> plist, ArrayList<ArrayList<Integer>> ptlist, int[] task) {
		if(n==0) return 0;
		if(n==1) return task[1];
		
		int m=-1;
		for(int i = 1;i<=n;i++) {
			int c = plist.get(n-i) + task[i];
			if(c >= m) {
				m = c;
				ptlist.get(n).clear();
				ptlist.get(n).addAll(ptlist.get(n-i));
				ptlist.get(n).add(i);
			}
		}
		
		return m;
	}
}
